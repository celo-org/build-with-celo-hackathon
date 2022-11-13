// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "./Proxiable.sol";
import "./ISuccour.sol";

contract Succour is Proxiable{

    
    address public owner;

    struct DAOMembers {
        string name;
        uint memberId;
        address memberAddress;
        uint balance;
        uint votingPower;
        uint withDrawTime;
        bool withdrawStatus;
    }

    struct Proposals {
        uint ID;
        uint amountProposed;
        uint amountGotten;
        string Title;
        string Description;
        uint NumberOfVotes;
        bool approved;
        address[] voters;
        address proposer;
        uint approveWithdraw;
    } 

    mapping (uint => Proposals) public proposals;
    mapping (address => DAOMembers) public members;

    uint public minimumRequirement;
    uint public maximumRequirement;
    IERC20 public celoTokenAddress;
    uint public totalVotingPower;
    uint public totalDAOBalance;
    uint proposalID = 1;
    uint memberID = 1;

    address[] EligibleVoters;
    DAOMembers[] public membersData;
    Proposals[] allProposals;
    Proposals[] approvedProposals;

      modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to perform this action");
        _;
    }



    function updateCode(address newCode) onlyOwner public {
        updateCodeAddress(newCode);
    }


    function encode(uint _minimumRequirement, uint _maximumRequirement, address _celoTokenAddress) external pure returns (bytes memory) {
        return abi.encodeWithSignature("initializer(uint256,uint256,address)", _minimumRequirement, _maximumRequirement, _celoTokenAddress);
    }

     function initializer(uint _minimumRequirement, uint _maximumRequirement, address _celoTokenAddress) public {
        require(owner == address(0), "Already initalized");
        owner = msg.sender;
        minimumRequirement = _minimumRequirement;
        maximumRequirement = _maximumRequirement;
        celoTokenAddress = IERC20(_celoTokenAddress);
    }


    function setMinAndMaxRequirement (uint _minimumRequirement, uint _maximumRequirement) external onlyOwner {
        minimumRequirement = _minimumRequirement;
        maximumRequirement = _maximumRequirement;
    }

    function depositMember (uint amount) internal {
        require(amount >= minimumRequirement, "You can't join DAO");
        require(amount <= maximumRequirement, "Reduce amount to join DAO");
        depositIntoDAO(amount);
    } 

    function joinDAO (string memory _name, uint amount) public {
        bool joined = checkDAOEligibility(msg.sender);
        require (!joined, "You can't join again with this account");
         memberID++;
         depositMember(amount);
         DAOMembers storage DM = members[msg.sender];
         DM.name = _name;
         DM.memberId = memberID;
         DM.memberAddress = msg.sender;
         DM.balance += amount;
         totalDAOBalance += amount;
         EligibleVoters.push(msg.sender);
         uint power = votePower(amount) / 1e6;
         totalVotingPower += power;
         DM.votingPower = power;
         membersData.push(DM);
    }

    function updateDAOMemberBal (uint amount) external {
        depositIntoDAO(amount);
        DAOMembers storage DM = members[msg.sender];
        uint addBal = amount + DM.balance;
        if (addBal > maximumRequirement) {
            DM.balance = maximumRequirement;
            totalDAOBalance += amount;
            membersData[DM.memberId - 1].balance = maximumRequirement;
            uint power = votePower( DM.balance) / 1e6;
            DM.votingPower = power;
            membersData[DM.memberId - 1].votingPower = power;
        }else {
            DM.balance += amount;
            membersData[DM.memberId - 1].balance += amount;
            totalDAOBalance += amount;
            uint power = votePower( DM.balance) / 1e6;
            DM.votingPower = power;
            membersData[DM.memberId - 1].votingPower = power;
        }
    }

    function memberPercentage(address _addr) public view returns(uint DAOPercentage){
         DAOMembers memory DM = members[_addr];
         uint bal = DM.balance;
        DAOPercentage = (bal * 100) / totalDAOBalance;
    }

    function votePower (uint bal) public view returns (uint power) {
        power = (bal * 1e6)/minimumRequirement;
    }

    function checkDAOEligibility (address addr) public view returns (bool status) {
        for (uint i; i < EligibleVoters.length; i++) {
            if (EligibleVoters[i] == addr) {
                status = true;
            }
        }
    }

    function checkIfVoted (address addr, uint id) public view returns (bool status) {
        address[] memory proposalVotees = proposals[id].voters;
        for (uint i; i < proposalVotees.length; i++) {
            if (proposalVotees[i] == addr) {
                status = true;
            }
        }
    }
 
    function proposeProject (string memory _title, string memory _description, uint _amountProposed) external  {
        proposalID++;
        bool check = checkDAOEligibility(msg.sender);
        require(check == true, "You can't propose a project");
        Proposals storage propose = proposals[proposalID];
        DAOMembers memory DM = members[msg.sender];
        uint vote = DM.votingPower;
        propose.ID = proposalID;
        propose.amountProposed = _amountProposed;
        propose.NumberOfVotes += vote; 
        propose.Title = _title;
        propose.Description = _description;
        propose.proposer = msg.sender;
        propose.voters.push(msg.sender);
        allProposals.push(propose);
    }


    function memberVote (uint IDofProposal) external {
        bool check1 = checkDAOEligibility(msg.sender);
        require(check1 == true, "You can't vote");
        Proposals storage propose = proposals[IDofProposal];
        uint position = propose.ID;
        bool check2 = checkIfVoted(msg.sender, position); 
        require(check2 != true, "You can't vote twice");
        uint votepower = members[msg.sender].votingPower;
        propose.NumberOfVotes += votepower;
        allProposals[position-1].NumberOfVotes += votepower;
        uint requiredVote =  projectRequiredPercentage();
        propose.voters.push(msg.sender);
        allProposals[position-1].voters.push(msg.sender);
        if (propose.NumberOfVotes >= requiredVote) {
            approvedProposals.push(propose);
            propose.approved = true;
            uint DAOdonation = donationFromDAO(position);
            propose.amountGotten += DAOdonation;
            approvedProposals[position-1].amountGotten += DAOdonation;
        }
    }

    function donationFromDAO (uint id) private returns(uint DAOtotalPay){
        DAOMembers storage DM = members[msg.sender];
        uint proposedAmount = proposals[id].amountProposed;
        DAOtotalPay = (60 * proposedAmount) / 100 ;
        uint IDofMember = DM.memberId;
        uint DAOmembers = EligibleVoters.length;
        uint memberPayment = DAOtotalPay / DAOmembers;
        DM.balance -= memberPayment;
        membersData[IDofMember - 1].balance -= memberPayment;
        depositIntoDAO(memberPayment);
    }


     function donateToProject (uint amount, uint projectPosition) public {
        depositIntoDAO(amount);
        proposals[projectPosition].amountGotten += amount;
        approvedProposals[projectPosition-1].amountGotten += amount;
    }


    function depositIntoDAO (uint amount) public {
        IERC20(celoTokenAddress).transferFrom(msg.sender, address(this), amount);
    }

    function projectRequiredPercentage () public view returns(uint result) {
        result = (70 * totalVotingPower) / 100;
    }


    function requestToWithdrawDAO () public  {
        bool eligibility = checkDAOEligibility(msg.sender);
        require(eligibility == true, "You aren't part of DAO");
        DAOMembers storage DM = members[msg.sender];
        uint timeRequired = block.timestamp + 14 days;
        DM.withDrawTime += timeRequired;
        DM.withdrawStatus = true;
    }


   function WithDrawFromDao (uint amount) public {
       DAOMembers storage DM = members[msg.sender];
       bool status = DM.withdrawStatus;
       uint time = DM.withDrawTime;
       require(status == true, "You haven't requested for withdrawal");
       require(block.timestamp >= time, "Time of withdrawal not reached");
       require(amount <= DM.balance, "You cant send more than you have");
       uint IDofMember = DM.memberId;
       DM.balance -= amount;
       membersData[IDofMember - 1].balance -= amount;
       IERC20(celoTokenAddress).transferFrom(address(this), msg.sender, amount);
       DM.withdrawStatus = false;
       DM.withDrawTime = 0;
   }

   function approveWithdrawProposalFund (uint IDofProposal) public {
        bool eligibility = checkDAOEligibility(msg.sender);
        require(eligibility == true, "You aren't part of DAO");
        uint votepower = members[msg.sender].votingPower;
        Proposals storage propose = proposals[IDofProposal];
        propose.approveWithdraw += votepower;
   }


   function withdrawProposalFund (address addr, uint IDofProposal) external  onlyOwner {
       require(addr != address(0), "Can't withdraw to this Address");
       Proposals storage propose = proposals[IDofProposal];
       uint proposedAmount = propose.amountProposed;
       uint IdofProposal = propose.ID;
       uint proposedAmountGotten = propose.amountGotten;
       require(proposedAmountGotten >= proposedAmount, "Proposed amount not gotten");
       uint approvalPower = projectRequiredPercentage();
       require(propose.approveWithdraw  >= approvalPower, "You can't withdraw yet");
       propose.amountGotten = 0;
       approvedProposals[IdofProposal -1].amountGotten = 0;
       IERC20(celoTokenAddress).transferFrom(address(this), addr, proposedAmountGotten);
   }


   function viewMembers () public view returns(DAOMembers[] memory) {
        return membersData;
    }


   function viewAllProposals () public view returns(Proposals[] memory) {
        return allProposals;
    }

    function viewElidgibleMembers () public view returns(address[] memory) {
        return EligibleVoters;
    }


   function viewAllApprovedProposals () public view returns(Proposals[] memory) {
        return approvedProposals;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                            /////// Gooooo FUNDMEEEEEEEE ////////////////////


        struct individualFundMe {
            uint goFundID;
            string name;
            string reasonForFund;
            uint amountNeeded;
            uint amountGotten;
            bool status;
            address[] donators;
        } 
        uint GOFUNDId = 1;
        mapping (address => individualFundMe) GoFunds;
        individualFundMe[] public goFunds;
        individualFundMe[] public sucessfulGoFunds;


        function createGofund (string memory _name, string memory _reasonForFund, uint _amountNeeded ) public {
            GOFUNDId++;
            individualFundMe storage GOFUND = GoFunds[msg.sender];
            GOFUND.name = _name;
            GOFUND.reasonForFund = _reasonForFund;
            GOFUND.amountNeeded = _amountNeeded;
            GOFUND.goFundID = GOFUNDId;
            goFunds.push(GOFUND);
        }


        function fundGoFund (uint amount, address addr)public {
            individualFundMe storage GOFUND = GoFunds[addr];
            depositIntoDAO(amount);
            uint idOfGoFund = GOFUND.goFundID;
            GOFUND.amountGotten += amount;
            goFunds[idOfGoFund - 1].amountGotten += amount;
            GOFUND.donators.push(msg.sender);
        }

        function withdrawFromGoFund (address addr)public {
            individualFundMe storage GOFUND = GoFunds[msg.sender];
            require (addr != address(0), "Can't withdraw to this address");
            uint fundsGotten = GoFunds[msg.sender].amountGotten;
            uint neededFund = GoFunds[msg.sender].amountNeeded;
            require(fundsGotten >= neededFund, "You can't withDraw until fund is complete");
            uint idOfGoFund = GoFunds[msg.sender].goFundID;
            goFunds[idOfGoFund - 1].amountGotten = 0;
            GoFunds[msg.sender].amountGotten = 0;
            goFunds[idOfGoFund - 1].status = true;
            GoFunds[msg.sender].status = true;
            IERC20(celoTokenAddress).transferFrom(address(this), addr, fundsGotten);
            sucessfulGoFunds.push(GOFUND);
        }
        function returnAllGoFunds () public view returns(individualFundMe[] memory) {
            return goFunds;
        }

        function returnAllSuccessFulGoFunds () public view returns(individualFundMe[] memory) {
            return sucessfulGoFunds;
        }


    
}