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
  uint256 estRepayment;
  uint256 minDuration;
  uint256 maxDuration;
  uint256 setDeadline;
}

contract P2PLoan {
  IERC20 private token;
  address payable[] loanParties;
  LoanDetails LD;

  modifier isParty(LoanDetails memory _LD) {
    require(msg.sender == _LD.borrower || msg.sender == _LD.lender);
    _;
  }

  constructor(address payable _creator, LoanDetails memory _LD) {
    loanParties.push(_creator);
    LD = _LD;
  }

  function getLoanDetails() external view returns (LoanDetails memory) {}
}
