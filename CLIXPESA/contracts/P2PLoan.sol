// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;

// Importing OpenZeppelin's SafeMath Implementation
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './utils.sol';

struct LoanDetails {
  string id;
  IERC20 token;
  address lender;
  string lenderName;
  address borrower;
  string borrowerName;
  uint256 principal;
  uint256 interest;
  uint256 balance;
  uint256 minDuration;
  uint256 maxDuration;
  uint256 setDeadline;
}

contract P2PLoan {
  using SafeMath for uint256;
  IERC20 private token;
  address payable[2] loanParties;
  LoanDetails LD;

  enum LoanState {
    isActive,
    isPending,
    isTerminated
  }

  LoanState public currentState = LoanState.isPending;

  modifier loanState(LoanState _state) {
    require(currentState == _state);
    _;
  }

  modifier isParty(LoanDetails memory _LD) {
    require(msg.sender == _LD.borrower || msg.sender == _LD.lender);
    _;
  }

  event LoanFunded(uint256 time, address borrower, uint256 amount);
  event LoanRepaid(uint256 time, address lender, uint256 amount);

  constructor(address payable _creator, LoanDetails memory _LD) {
    loanParties[0] = _creator;
    token = _LD.token;
    LD = _LD;
  }

  function getLoanDetails() external view returns (LoanDetails memory) {
    return LD;
  }

  function fundLoan(uint256 amount) external payable isParty(LD) loanState(LoanState.isPending) {
    require(msg.sender == LD.lender, 'You are not the lender');
    require(token.balanceOf(msg.sender) >= LD.principal, 'Insuficient Funds');
    require(token.transferFrom(msg.sender, payable(LD.borrower), amount), 'Failed to Fund loan');
    loanParties[1] = payable(msg.sender);
    LD.balance = amount;
    currentState = LoanState.isActive;

    emit LoanFunded(block.timestamp, payable(LD.borrower), amount);
  }

  function RepayLoan(uint256 amount) external payable isParty(LD) loanState(LoanState.isActive) {
    require(msg.sender == LD.borrower, 'You are not the borrower');
    require(LD.balance > 0, 'There is nothing to pay');
    require(token.balanceOf(msg.sender) >= amount, 'Insuficient Funds');
    require(token.transferFrom(msg.sender, payable(LD.borrower), amount), 'Failed to Repay loan');
    LD.balance.sub(amount);

    emit LoanRepaid(block.timestamp, payable(LD.lender), amount);
    if (LD.balance == 0) {
      currentState = LoanState.isTerminated;
    }
  }
}
