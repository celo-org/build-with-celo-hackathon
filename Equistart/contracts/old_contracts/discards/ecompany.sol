// contracts/ecompany.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ecompanyDAO is ReentrancyGuard, AccessControl {
    bytes32 public constant CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR");
    bytes32 public constant STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    uint32 constant minimumVotingPeriod = 1 weeks;
    uint256 numOfProposals;
    
    struct CharityProposal {
        uint256 id;
        uint256 amount;
        uint256 livePeriod;
        uint256 votesFor;
        uint256 votesAgainst;
        string description;
        bool votingPassed;
        bool paid;
        address payable charityAddress;
        address proposer;
        address paidBy;
    }
    
    
    //maps the address of a stakeholder to the list of the Proposals that address has voted on.
    //contributors address mapped to the amount sent.
    //maps address and balance of stakeholders.
    mapping(uint256 => CharityProposal) private charityProposals;
    mapping(address => uint256[] ) private stakeholderVotes;
    mapping(address => uint256 ) private contributors;
    mapping(address => uint256) private stakeholders;
   
    
    //Events are emitted for every new Proposal, new contribution, new payment transfer.
    //Nice for logging purposes, and make filtering events simpler.
    event ContributionReceived(address indexed fromAddress, uint256 amount);
    event NewCharityProposal(address indexed proposer, uint256 amount);
    event PaymentTransfered( address indexed stakeholder, address indexed charityAddress, uint256 amount);
    
    
    modifier onlyStakeholder ( string memory message){
        require(hasRole(STAKEHOLDER_ROLE, msg.sender), message);
        _;
    }
    modifier onlyContributor(string memory message) {
        require(hasRole(CONTRIBUTOR_ROLE, msg.sender), message);
        _;
    }
    
    
    function createProposal(string calldata description, address charityAddress, uint256 amount) external onlyStakeholder("Only stakeholders are allowed to create Proposals") {
        uint256 proposalId = numOfProposals++;
        CharityProposal storage proposal = charityProposals[proposalId];
        proposal.id = proposalId;
        proposal.amount = amount;
        proposal.livePeriod = block.timestamp + minimumVotingPeriod;
        proposal.description = description;
        proposal.charityAddress = payable(charityAddress);
        proposal.proposer = payable(msg.sender);
        emit NewCharityProposal(msg.sender, amount);
    }
    
    
    function vote(uint256 proposalId, bool supportProposal) external onlyStakeholder("Only stakeholders are allowed to vote") {
        CharityProposal storage charityProposal = charityProposals[proposalId];
        votable(charityProposal);
        
        if(supportProposal)  charityProposal.votesFor++;
        else charityProposal.votesAgainst++;
        
        stakeholderVotes[msg.sender].push(charityProposal.id);
        
    }
    
    //kind of modifier checking if the sender is eligible to vote on this proposal.
    function votable(CharityProposal storage charityProposal) private {
        if(charityProposal.votingPassed || charityProposal.livePeriod <= block.timestamp){
            charityProposal.votingPassed = true;
            revert("Voting perios has passed on this proposal");
        }
        
        uint256[] memory tempVotes = stakeholderVotes[msg.sender];
        for (uint256 votes = 0; votes < tempVotes.length; votes++){
            if(charityProposal.id == tempVotes[votes])
                revert("This stakeholder already voted on this proposal");
        }
    }
    
    //instance
    //conditions
    //variables changed accordingly
    //check out for payment return
    function payCharity(uint256 proposalId) external onlyStakeholder("Only stakeholders are allowed to make paymebnts"){
        CharityProposal storage charityProposal = charityProposals[proposalId];
        if (charityProposal.paid)
            revert("Payment has already been made to this charity");
        if (charityProposal.votesFor <= charityProposal.votesAgainst)
            revert("The proposal does not have required amount of votes to pass");
            
        charityProposal.paid = true;
        charityProposal.paidBy = msg.sender;
        
        emit PaymentTransfered(msg.sender, charityProposal.charityAddress, charityProposal.amount);
        
        return charityProposal.charityAddress.transfer(charityProposal.amount);
    }
    
    receive() external payable {
        emit ContributionReceived(msg.sender, msg.value);
    }
    
    //change ether to CELO currency
    function makeStakeholder(uint256 amount) external {
        address account = msg.sender;
        uint256 amountContributed = amount;
        if(!hasRole(STAKEHOLDER_ROLE, account)){
            uint256 totalContributed = contributors[account]+ amountContributed;
            if (totalContributed >= 5 ether){
                stakeholders[account] = totalContributed;
                contributors[account] += amountContributed;
                _setupRole(STAKEHOLDER_ROLE, account);
                _setupRole(CONTRIBUTOR_ROLE, account);
            } else{
                contributors[account] += amountContributed;
                _setupRole(CONTRIBUTOR_ROLE, account);
            }
        }else{
            contributors[account] += amountContributed;
            stakeholders[account] += amountContributed;
        }
    }
    
    function getProposals() public view returns(CharityProposal[] memory props){
        props = new CharityProposal[](numOfProposals);
        
        for (uint256 index = 0; index< numOfProposals; index++){
            props[index] = charityProposals[index]; 
        }
    }
    
    function getProposal(uint256 proposalId) public view returns (CharityProposal memory){
        return charityProposals[proposalId];
    }
    
    function getStakeholderVotes()public view onlyStakeholder("User is not a stakeholder") returns(uint256[] memory){
        return stakeholderVotes[msg.sender];
    }
    
    function getStakeholderBalance() public view onlyStakeholder("User is not a stakeholder") returns (uint256){
        return stakeholders[msg.sender];
    }
    
    function isStakeholder() public view returns (bool){
        return stakeholders[msg.sender] > 0;
    }
    
    function getContributorBalance() public view onlyContributor("User is not a contributor") returns (uint256){
        return contributors[msg.sender];
    }
    
    function isContributor() public view returns (bool) {
        return contributors[msg.sender]>0;
    }
    
    
    
}
