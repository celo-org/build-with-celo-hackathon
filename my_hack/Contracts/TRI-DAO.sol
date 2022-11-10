// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

library SafeMath {
  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b);
    return c;

  }

  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b > 0); // Solidity only automatically asserts when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;

  }

  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a);
    uint256 c = a - b;
    return c;
  }

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a);
    return c;
  }

  /**
  * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b != 0);
    return a % b;
  }

}



contract DAO {
    // implement the safe math library
    using SafeMath for uint256; 
    
    // struct to hold proposals
    struct Proposal {
        uint256 id;
        string name;
        uint256 amount;
        address payable recipient;
        uint256 votes;
        uint256 end;
        bool executed;
    }

// declare mappings
    mapping(address => bool) public investors;
    mapping(address => uint256) public shares;
    mapping(address => mapping(uint256 => bool)) public votes;
    mapping(uint256 => Proposal) public proposals;
    uint256 public totalShares;
    uint256 public availableFunds;
    uint256 public contributionEnd;
    uint256 public nextProposalId;
    uint256 public voteTime;
    uint256 public quorum;
    address public admin;

// contract address for cusd
    //address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal cUsdTokenAddress = 0x03e4CcA31f8B0264F3587e969771fE9a7f88415f;

    constructor(
        uint256 contributionTime,
        uint256 _voteTime,
        uint256 _quorum
    ) {
        require(
            _quorum > 0 && _quorum < 100,
            "quorum must be between 0 and 100"
        );
        contributionEnd = block.timestamp + contributionTime * 1 days;
        voteTime = _voteTime * 1 hours;
        quorum = _quorum;
        admin = msg.sender;
    }

    function contribute(uint256 _amount)
        external
        payable
        contributionTimeExpired
    {
        
        require(_amount > 0, "Please enter an amount greater than zero");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
            "Transfer failed"
        );
        investors[msg.sender] = true;
        shares[msg.sender] = shares[msg.sender].add(_amount) ;
        totalShares = totalShares.add(_amount) ;
        availableFunds = availableFunds.add(_amount) ;
    }

    function redeemShares(uint256 _amount) external {
        require(shares[msg.sender] >= _amount, "not enough shares");
        require(availableFunds >= _amount, "not enough available funds");
        shares[msg.sender] -= _amount;
        availableFunds = availableFunds.add(_amount) ;
        IERC20Token(cUsdTokenAddress).transfer(payable(msg.sender), _amount);
    }

    function transferShares(uint256 amount, address to) external {
        require(shares[msg.sender] >= amount, "not enough shares");
        shares[msg.sender] = shares[msg.sender].sub(amount) ;
        shares[to] = shares[to].add(amount) ;
        investors[to] = true;
    }

    function createProposal(
        string memory name,
        uint256 amount,
        address payable recipient
    ) public onlyInvestors {
        require(availableFunds >= amount, "amount too big");
        proposals[nextProposalId] = Proposal(
            nextProposalId,
            name,
            amount,
            recipient,
            0,
            block.timestamp + voteTime,
            false
        );
        availableFunds =  availableFunds.sub(amount);
        nextProposalId++;
    }

    function vote(uint256 proposalId) external onlyInvestors {
        Proposal storage proposal = proposals[proposalId];
        require(
            votes[msg.sender][proposalId] == false,
            "investor can only vote once for a proposal"
        );
        require(
            block.timestamp < proposal.end,
            "can only vote until proposal end date"
        );
        votes[msg.sender][proposalId] = true;
        proposal.votes = proposal.votes .add( shares[msg.sender]);
    }

    function executeProposal(uint256 proposalId) external onlyAdmin {
        Proposal storage proposal = proposals[proposalId];
        require(
            block.timestamp >= proposal.end,
            "cannot execute proposal before end date"
        );
        require(
            proposal.executed == false,
            "cannot execute proposal already executed"
        );
        require(
            (proposal.votes / totalShares) * 100 >= quorum,
            "cannot execute proposal with votes # below quorum"
        );
        _transferFunds(proposal.amount, proposal.recipient);
    }

    function withdrawFunds(uint256 amount, address payable to)
        external
        onlyAdmin
    {
        _transferFunds(amount, to);
    }

    function _transferFunds(uint256 amount, address payable to) internal {
        require(amount <= availableFunds, "not enough availableFunds");
        availableFunds = availableFunds.sub(amount);
        IERC20Token(cUsdTokenAddress).transfer(to, amount);
    }

    modifier onlyInvestors() {
        require(investors[msg.sender] == true, "only investors");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier contributionTimeExpired() {
        require(
            block.timestamp < contributionEnd,
            "cannot contribute after contributionEnd"
        );
        _;
    }
}
