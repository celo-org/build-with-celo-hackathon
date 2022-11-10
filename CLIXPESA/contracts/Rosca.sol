// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;

// Importing OpenZeppelin's SafeMath Implementation
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './utils.sol';
import 'hardhat/console.sol';

struct RoscaDetails {
  IERC20 token;
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
  using SafeMath for uint256;

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

  IERC20 private token;

  //Initialize public variables
  address payable[] members;
  address payable[] admins;
  address payable dueMember;
  mapping(address => uint256) contributions;
  mapping(address => bool) isMember;
  mapping(address => bool) isPotted;
  mapping(address => bool) isCtbCleared;
  RoscaDetails RD;
  uint256 roscaBalance;
  uint256 goalBalance;
  uint256 ctbAmount;
  uint256 roundNo;
  uint256 ctbDeadline;
  uint256 disbDeadline;

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

  event CreatedRound(
    uint256 roundNo,
    uint256 ctbDeadline,
    uint256 disbDeadline,
    address payable dueMember
  );
  event PaidoutRound(address payedMember, uint256 paidAmount, uint256 roundNo);

  // Function to receive Ether. msg.data must be empty
  receive() external payable {}

  // Fallback function is called when msg.data is not empty
  fallback() external payable {}

  constructor(address payable _creator, RoscaDetails memory _rD) {
    token = _rD.token;
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
    external
    view
    returns (
      string memory roscaName,
      string memory imgLink,
      uint256 goalAmount,
      string memory ctbDay,
      string memory ctbOccur,
      string memory disbDay,
      uint256 activeMembers,
      uint256 currentRound,
      uint256 nxtDeadline,
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
    currentRound = roundNo;
    creator = admins[0];
    activeMembers = members.length;
    return (
      roscaName,
      imgLink,
      goalAmount,
      ctbDay,
      ctbOccur,
      disbDay,
      activeMembers,
      currentRound,
      ctbDeadline,
      creator,
      token.balanceOf(address(this)),
      address(this)
    );
  }

  function getMembers() external view returns (address payable[] memory) {
    return members;
  }

  function getRoscaBalance() public view returns (uint256) {
    return token.balanceOf(address(this));
  }

  function getMemberBalance() public view returns (uint256) {
    return members[0].balance;
  }

  function joinRosca(string calldata authCode) external returns (bool success) {
    require(
      keccak256(abi.encode(authCode)) == keccak256(abi.encode(RD.authCode)),
      'Invalid authorization code!'
    );
    require(isMember[msg.sender] == false, 'You are already a Member');
    members.push(payable(msg.sender));
    isMember[msg.sender] = true;
    success = true;
  }

  function createRound() internal {
    uint256 ctbDay = _getDayNo(RD.ctbDay);
    uint256 disbDay = _getDayNo(RD.disbDay);
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
  function fundRound(uint256 amount) external payable roundState(RoundState.isOpen) {
    require(goalBalance < RD.goalAmount, 'Round is fully funded');
    //require(msg.sender != dueMember, "It's your round. Relax!");
    require(contributions[msg.sender] < RD.ctbAmount, 'You have fully contributed to this Round');
    require(token.balanceOf(msg.sender) >= amount, 'Insuficient Funds');
    require(token.transferFrom(msg.sender, address(this), amount), 'Failed to Fund Rosca');
    //cUSDToken.transferFrom(msg.sender, address(this), amount);

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

  //Payout the round
  // !Payout at the given Payout deadline.
  function payoutRound() public payable returns (bool payedout) {
    //uint256 balance = getRoscaBalance();
    require(goalBalance == RD.goalAmount, 'The round is not fully funded');
    require(isMember[dueMember], 'Due member is not a member! Reary?!');
    //change to be transfer with cUSDToken
    //cUSDToken.transferFrom(address(this), dueMember, RD.goalAmount);
    require(token.balanceOf(address(this)) >= RD.goalAmount, 'Insuficient Funds');
    require(token.transfer(dueMember, RD.goalAmount), 'Failed to pay due member');
    goalBalance = 0;
    //Reset Contributons
    for (uint256 i = 0; i < members.length; i++) {
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

  function withdrawFunds() external payable returns (bool withdrawn) {
    require(rdState != RoundState.isPayedOut, 'Already PayedOut');
    require(msg.sender == dueMember, 'This is not your round');
    if (payoutRound()) {
      return true;
    }
    return false;
  }

  // schDay: 1. Monday 7. Sunday //schOcurr: 1-daily, 7-weekly, 28-monthly
  //Handled weekly for now. !TODO: handle daily and monthly
  function nextDayAndTime(uint256 schDay) internal view returns (uint256 nextTimeStamp) {
    uint256 day;
    uint256 month;
    uint256 year;
    uint256 _days = block.timestamp / (24 * 60 * 60);
    uint256 dayOfWeek = ((_days + 3) % 7) + 1;
    (year, month, day) = utils._daysToDate(_days);
    uint256 nextDay = day + ((7 + schDay - dayOfWeek) % 7);

    nextTimeStamp = utils._daysFromDate(year, month, nextDay) * (24 * 60 * 60);

    if (nextTimeStamp <= block.timestamp) {
      nextDay = nextDay + 7;
      nextTimeStamp = nextTimeStamp + 7 days;
    }

    return (nextTimeStamp);
  }

  function _getDayNo(string storage day) internal pure returns (uint256 dayNo) {
    string[7] memory weekList = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    bytes32 encodedElement = keccak256(abi.encode(day));
    for (uint256 i = 0; i < weekList.length; i++) {
      if (encodedElement == keccak256(abi.encode(weekList[i]))) {
        return i + 1;
      }
    }
  }
}
