// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.2;
// import "./joincommunity.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";


contract tumainiDao is Ownable,AccessControl ,ReentrancyGuard {

/*
*user of the dao will be of two types Contributor and StakeHolder;
*/
bytes32 public constant CONTRIBUTOR_ROLE = keccak256("CONTRIBUTOR");
bytes32 public constant STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");

/*
*@dev mimimum voting period of 1 week for a proposal;
*/
uint constant minimumVotingPeriod = 1 weeks;
//number of proposals
uint numOfProposals;
//content of proposal
struct TumainCharityProposal{
    uint256 id;
    uint256 amount;
    uint256 livePeriod;
    uint256 votesFor;
    uint256 voteAgainst;
    string description;
    bool votingPassed;
    bool paid;
    address payable charityAddress;
    address proposer;
    address paidBy;
}
//contributors maps address and the amounts they have sent
//stakeholders  maps the address and balances of StakeHolders
mapping(uint256 => TumainCharityProposal)private tumainicharityproposal;
mapping(address => uint256[]) private stakeholderVotes;
mapping(address => uint256) private contributors;
mapping(address => uint256) private stakeholders;
IERC20 tokens;

//evets
event ContributionReceived(address indexed fromAddress, uint256 amount);
event NewCharityProposal(address indexed proposer, uint256 amount);
event PaymentTransfered(
    address indexed stakeholder,
    address indexed charityAddress,
    uint256 amount
);
constructor(address _tokens){
    tokens= IERC20(_tokens);
    
}

modifier onlyStakeHolder(string memory message){
    require(hasRole(STAKEHOLDER_ROLE,msg.sender),message);
    _;
}
modifier onlyContributor(string memory message) {
    require(hasRole(CONTRIBUTOR_ROLE, msg.sender), message);
    _;
}
function addMember()public{
    grantRole(STAKEHOLDER_ROLE,msg.sender);
}

/**
*@dev create proposal*/
function createProposal(string calldata description,address charityAddress,uint256 amount)external onlyStakeHolder("only stakeHolders are allowed to create a proposal"){
   require(tokens.balanceOf(msg.sender) >= 9 ,"less tumain token please purchase");
    uint proposalid= numOfProposals ++;
    TumainCharityProposal storage proposal = tumainicharityproposal[proposalid];
    proposal.id = proposalid;
     proposal.description = description;
      proposal.proposer = payable(msg.sender);
       proposal.charityAddress = payable(charityAddress);
        proposal.amount = amount;
         proposal.livePeriod = block.timestamp + minimumVotingPeriod;
        
         emit NewCharityProposal(msg.sender,amount);

}
function vote(uint256 proposalid , bool supportProposal)external onlyStakeHolder("only StakeHolder can vote"){
    TumainCharityProposal storage tumainiProposal = tumainicharityproposal[proposalid];
    votable(tumainiProposal);
    if(supportProposal) tumainiProposal.votesFor++;
    else tumainiProposal.voteAgainst ++;
    stakeholderVotes[msg.sender].push(tumainiProposal.id);
}
function votable(TumainCharityProposal storage tumainiProposal)private{
    if(tumainiProposal.votingPassed || tumainiProposal.livePeriod <= block.timestamp){
        tumainiProposal.votingPassed = true;
        revert("Voting period has passed for this proposal");
    }
    uint256[] memory tempVotes = stakeholderVotes[msg.sender];
    for( uint256 votes =0; votes< tempVotes.length;votes++){
        if(tumainiProposal.id == tempVotes[votes]){
        revert("This stakeholder has already voted on this proposal");
    }}

}
//the contract call
//contribute function
function contributeToCharity(uint proposalid)public payable{
    TumainCharityProposal storage tumainproposal = tumainicharityproposal[proposalid];
    tumainproposal.charityAddress.transfer(msg.value);
}
function transferToCharity(uint256 proposalid)external onlyStakeHolder("only StakeHolders are allowed to make payments"){
    TumainCharityProposal storage tumainiProposal = tumainicharityproposal[proposalid];
    if(tumainiProposal.paid )
        revert("payment have been made to this charity");
    
    if(tumainiProposal.votesFor <= tumainiProposal.voteAgainst)
        revert("The proposal does not have the required amount of votes");
    
    tumainiProposal.paid =true;
    tumainiProposal.paidBy = msg.sender;
    emit PaymentTransfered(
        msg.sender,
        tumainiProposal.charityAddress,
        tumainiProposal.amount
    );
    return tumainiProposal.charityAddress.transfer(tumainiProposal.amount);
}

/*
*@dev making stakeholders
*/
function makeStakeholder()external payable{
    address account = msg.sender;
    uint256 amountContributed = msg.value;
    if(!hasRole(STAKEHOLDER_ROLE,account)){
        uint256 totalContributed = contributors[account] + amountContributed;
        if(totalContributed >= msg.value){
            stakeholders[account] = totalContributed;
            contributors[account] = totalContributed;
            _setupRole(STAKEHOLDER_ROLE,account);
            _setupRole(CONTRIBUTOR_ROLE,account);
            payable(address(this)).transfer(msg.value);

        }else{
            contributors[account] += amountContributed;
            _setupRole(CONTRIBUTOR_ROLE,account);
        }
    }
    else{
         contributors[account] += amountContributed;
        stakeholders[account] += amountContributed;
    }
}

//get all proposals
function getAllProposals()public view returns(TumainCharityProposal[] memory props){
    props = new TumainCharityProposal[](numOfProposals);
    for(uint256 index =0 ; index < numOfProposals ; index ++){
        props[index] =  tumainicharityproposal[index];
    }
}
function getProposal(uint256 proposalid)public view returns(TumainCharityProposal memory){
    return tumainicharityproposal[proposalid];
}
//get stakeholder votes
function getStakeHolderVotes() public view onlyStakeHolder("User not Stakeholder") returns(uint256[] memory){
    return stakeholderVotes[msg.sender];
}
function getStakeholderBalance()
        public
        view
        onlyStakeHolder("User is not a stakeholder")
        returns (uint256)
{
    return stakeholders[msg.sender];
}
function isStakeholder() public view returns (bool) {
    return stakeholders[msg.sender] > 0;
}
function getContributorBalance()
        public
        view
        onlyContributor("User is not a contributor")
        returns (uint256)
{
    return contributors[msg.sender];
}
function isContributor() public view returns (bool) {
    return contributors[msg.sender] > 0;
}
function withDraw()public    onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
}
// receive() external payable {
//      //   emit ContributionReceived(msg.sender, msg.value);
// }
// fallback() external payable{
//   //  emit ContributionReceived(msg.sender, msg.value);

// }
function bal()public view returns(uint){
    return tokens.balanceOf(msg.sender); 
}
}
