// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;

// Importing OpenZeppelin's SafeMath Implementation
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./utils.sol";
import "hardhat/console.sol";

struct RoscaDetails {
    string roscaName;
    string imgLink;
    string authCode;
    uint256 goalAmount;
    uint256 ctbAmount;
    string ctbDay;
    string ctbOccur;
    string disbDay;
    string disbOccur;
}

contract Rosca {
    using SafeMath for uint256;
    using SafeMath for uint;

    enum RoundState {
        isOpen,
        isClosed,
        isPayedOut
    }

    enum RoscaState {
        isStarting,
        isLive,
        isEnded,
        isInActive
    }

    IERC20 private cUSDToken;

    //Initialize public variables
    address payable[] public members;
    address payable[] admins;
    address payable dueMember;
    mapping(address => uint) public contributions;
    mapping(address => bool) isMember;
    mapping(address => bool) isPotted;
    mapping(address => bool) isCtbCleared;
    RoscaDetails RD;
    uint256 roscaBalance;
    uint256 goalBalance;
    uint256 ctbAmount;
    uint roundNo;
    uint ctbDeadline;
    uint disbDeadline;

    //Initialize states
    RoscaState public rcState = RoscaState.isStarting;
    RoundState public rdState = RoundState.isOpen;

    //state modifiers
    modifier roscaState(RoscaState _state) {
        require(rcState == _state);
        _;
    }

    modifier roundState(RoundState _state) {
        require(rdState == _state);
        _;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    constructor(
        IERC20 token,
        address payable _creator,
        RoscaDetails memory _rD
    ) {
        cUSDToken = token;
        roscaBalance = 0;
        goalBalance = 0;
        RD = _rD;
        admins.push(_creator);
        members.push(_creator);
        isMember[_creator] = true;
        //Evaluate whether to create a round before all memebers have joined.
        //Creates round with creator being 1st receiver
        createRound();
    }

    function getDetails()
        public
        view
        returns (
            string memory roscaName,
            string memory imgLink,
            uint goalAmount,
            string memory ctbDay,
            string memory ctbOccur,
            string memory disbDay,
            string memory disbOccur,
            uint activeMembers,
            uint currentRound,
            address creator,
            uint256 roscaBal,
            address roscaAddress
        )
    {
        roscaName = RD.roscaName;
        imgLink = RD.imgLink;
        goalAmount = RD.goalAmount;
        ctbDay = RD.ctbDay;
        ctbOccur = RD.ctbOccur;
        disbDay = RD.disbDay;
        disbOccur = RD.disbOccur;
        currentRound = roundNo;
        creator = admins[0];
        activeMembers = members.length;
        roscaBal = getRoscaBalance();
        roscaAddress = address(this);
        return (
            roscaName,
            imgLink,
            goalAmount,
            ctbDay,
            ctbOccur,
            disbDay,
            disbOccur,
            activeMembers,
            currentRound,
            creator,
            roscaBal,
            roscaAddress
        );
    }

    function getMembers() external view returns (address payable[] memory) {
        return members;
    }

    function getRoscaBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getMemberBalance() public view returns (uint256) {
        return members[0].balance;
    }

    function joinRosca(string calldata authCode) external {
        require(
            keccak256(abi.encode(authCode)) ==
                keccak256(abi.encode(RD.authCode)),
            "Invalid authorization code!"
        );
        require(isMember[msg.sender] == false, "You are already a Member");
        members.push(payable(msg.sender));
        isMember[msg.sender] = true;
    }

    event CreatedRound(
        uint roundNo,
        uint ctbDeadline,
        uint disbDeadline,
        address payable dueMember
    );

    function createRound() internal {
        uint ctbDay = _getDayNo(RD.ctbDay);
        uint disbDay = _getDayNo(RD.disbDay);
        ctbDeadline = nextDayAndTime(ctbDay);
        disbDeadline = nextDayAndTime(disbDay);
        if (rcState == RoscaState.isStarting) {
            roundNo = 1;
            dueMember = members[roundNo - 1];
            rcState = RoscaState.isLive;
            rdState = RoundState.isOpen;
            ctbDeadline = nextDayAndTime(ctbDay);
            disbDeadline = nextDayAndTime(disbDay);
        } else {
            if (roundNo >= members.length) {
                roundNo = 0;
            }
            roundNo += 1;
            dueMember = members[roundNo - 1];
            rdState = RoundState.isOpen;
            ctbDeadline += 7 days;
            disbDeadline += 7 days;
        }

        emit CreatedRound(roundNo, ctbDeadline, disbDeadline, dueMember);
    }

    //Fund the round
    function fundRound(uint256 amount)
        external
        payable
        roundState(RoundState.isOpen)
    {
        uint balance = cUSDToken.balanceOf(msg.sender);
        console.log(balance);
        require(goalBalance < RD.goalAmount, "Round is fully funded");
        require(balance > amount, "Insufficient funds");
        //require(msg.sender != dueMember, "It's your round. Relax!");
        require(
            contributions[msg.sender] < RD.ctbAmount,
            "You have fully contributed to this Round"
        );
        //change to be transfer with cUSDToken
        //cUSDToken.approve(address(this), amount);
        //payable(msg.sender).transfer(amount);
        //cUSDToken.transferFrom(msg.sender, address(this), amount);
        (
            bool sent, /*bytes memory data*/

        ) = address(this).call{value: amount}("");
        require(sent, "Failed to send CELO");
        contributions[msg.sender] = contributions[msg.sender].add(amount);
        goalBalance = goalBalance.add(amount);
        roscaBalance = getRoscaBalance();
        if (goalBalance == RD.goalAmount) {
            rdState = RoundState.isClosed;
        }
    }

    /*
    /// Not enough funds for transfer. Requested `requested`,
    /// but only `available` available.
    error NotEnoughFunds(uint requested, uint available);
    */
    event PaidoutRound(address payedMember, uint256 paidAmount, uint roundNo);

    //Payout the round
    // !Payout at the given Payout deadline.
    function payoutRound() public payable returns (bool payedout) {
        uint256 balance = getRoscaBalance();
        require(goalBalance == RD.goalAmount, "The round is not fully funded");
        require(balance >= RD.goalAmount, "Your chamaa is low on funds");
        require(isMember[dueMember], "Due member is not a member! Reary?!");
        //change to be transfer with cUSDToken
        //cUSDToken.transferFrom(address(this), dueMember, RD.goalAmount);
        (
            bool sent, /*bytes memory data*/

        ) = dueMember.call{value: (RD.goalAmount)}("");
        require(sent, "Failed to send CELO");
        if (sent) {
            goalBalance = 0;
            //Reset Contributons
            for (uint i = 0; i < members.length; i++) {
                contributions[members[i]] = 0;
            }
            isPotted[dueMember] = true;
            rdState = RoundState.isPayedOut;
            roscaBalance = getRoscaBalance();
            emit PaidoutRound(dueMember, RD.goalAmount, roundNo);
            //Create another round
            createRound();
            return true;
        }
    }

    function withdrawFunds() external payable returns (bool withdrawn) {
        require(rdState != RoundState.isPayedOut, "Already PayedOut");
        require(msg.sender == dueMember, "This is not your round");
        if (payoutRound()) {
            return true;
        }
        return false;
    }

    // schDay: 1. Monday 7. Sunday //schOcurr: 1-daily, 7-weekly, 28-monthly
    //Handled weekly for now. !TODO: handle daily and monthly
    function nextDayAndTime(uint schDay)
        internal
        view
        returns (uint nextTimeStamp)
    {
        uint day;
        uint month;
        uint year;
        uint _days = block.timestamp / (24 * 60 * 60);
        uint dayOfWeek = ((_days + 3) % 7) + 1;
        (year, month, day) = utils._daysToDate(_days);
        uint nextDay = day + ((7 + schDay - dayOfWeek) % 7);

        nextTimeStamp =
            utils._daysFromDate(year, month, nextDay) *
            (24 * 60 * 60);

        if (nextTimeStamp <= block.timestamp) {
            nextDay = nextDay + 7;
            nextTimeStamp = nextTimeStamp + 7 days;
        }

        return (nextTimeStamp);
    }

    function _getDayNo(string storage day) internal pure returns (uint dayNo) {
        string[7] memory weekList = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ];
        bytes32 encodedElement = keccak256(abi.encode(day));
        for (uint i = 0; i < weekList.length; i++) {
            if (encodedElement == keccak256(abi.encode(weekList[i]))) {
                return i + 1;
            }
        }
    }
}
