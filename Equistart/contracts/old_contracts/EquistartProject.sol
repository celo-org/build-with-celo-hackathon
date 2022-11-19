// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

// import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";



contract EquistartProject is ERC20{
    
    // bytes32 public constant STAKEHOLDER_ROLE = keccak256("STAKEHOLDER");
    // bytes32 public constant INVESTOR_ROLE = keccak256("INVESTOR");
    // bytes32 public constant BOARD_MEMBER_ROLE = keccak256("BOARDMEMBER");
    uint32 constant minimumVotingPeriod = 1 weeks;
    uint256 numOfGeneralProposals;
    
    struct GeneralProposal {
        uint256 id;
        string header;
        string description;
        address proposer;
        uint256 livePeriod;
        uint256 votesFor;
        uint256 votesAgainst;
        bool votingPassed;
    }
    
    mapping(uint256 => GeneralProposal) private generalProposals;
    mapping(address => uint256[]) private generalProposalVotes;
    // mapping(address => uint256) private boardMembers;

    event NewGeneralProposal(address indexed proposer);
    event transferERC20Token(address _from, address _to, uint256 _amount);


    constructor(string memory name, string memory symbol, uint tokenSupply, address manager) ERC20(name, symbol){
        _mint(manager, tokenSupply);
    }
    
    // modifier onlyInvestor (string memory errorMessage){
    //     require(hasRole(INVESTOR_ROLE, msg.sender), errorMessage);
    //     _;
    // }
    // modifier onlyBoardMember (string memory errorMessage){
    //     require(hasRole(BOARD_MEMBER_ROLE, msg.sender), errorMessage);
    //     _;
    // }

    modifier onlyBoardMember(string memory message){
        require( (balanceOf(msg.sender) > totalSupply()/20), message);
        _;
    }
    
    function createGeneralProposal(string memory header, string calldata description) external onlyBoardMember("Only board member with token > 5% can create proposal") {
        uint proposalId = numOfGeneralProposals++;
        GeneralProposal storage proposal = generalProposals[proposalId];
        proposal.id = proposalId;
        proposal.header = header;
        proposal.description = description;
        proposal.livePeriod = block.timestamp + minimumVotingPeriod;
        proposal.proposer = msg.sender;
        emit NewGeneralProposal(msg.sender);
    }
    
    function vote(uint256 proposalId, bool supportProposal) external onlyBoardMember("Only board member with token > 5% can vote") {
        GeneralProposal storage proposal = generalProposals[proposalId];
        votable(proposal);
        
        if(supportProposal) proposal.votesFor++;
        else proposal.votesAgainst++;
        
        generalProposalVotes[msg.sender].push(proposal.id);
    }
    
    
    
    function votable(GeneralProposal storage generalProposal) private {
        if(generalProposal.votingPassed || generalProposal.livePeriod <= block.timestamp){
            generalProposal.votingPassed = true;
            revert("Voting Period has passed on this Proposal");
        }
        
        uint256[] memory tempVotes = generalProposalVotes[msg.sender];
        for (uint256 votes = 0; votes< tempVotes.length; votes++){
            if(generalProposal.id == tempVotes[votes])
                revert("You have already voted on this proposal");
        }
    }
    
    function getAllProposals() public view returns (GeneralProposal[] memory props){
        props = new GeneralProposal[](numOfGeneralProposals);
        
        for (uint256 index =0; index< numOfGeneralProposals; index++){
            props[index] = generalProposals[index];
        }
    }
    
    function getGeneralProposal(uint256 proposalId) public view returns (GeneralProposal memory){
        return generalProposals[proposalId];
    }
    
    function getVotingHistory() public view returns(uint256[] memory){
        return generalProposalVotes[msg.sender];
    }
    

    function transferERC20 (IERC20 token, address to, uint256 amount ) external onlyBoardMember("only board member can transfer token") {
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "Insufficient balance");
        token.transfer(to, amount);
        emit transferERC20Token(msg.sender, to, amount);
    }
    
    
}