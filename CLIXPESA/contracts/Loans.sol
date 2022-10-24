// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;

// Importing OpenZeppelin's SafeMath Implementation
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import 'hardhat/console.sol';

import './P2PLoan.sol';
import './LoanONRs.sol';

contract Loans {
  using SafeMath for uint256;
  using SafeMath for uint256;

  LoanONRs private ONR;

  struct ActiveLoan {
    P2PLoan loanAddress;
    bool lent;
  }

  //List of all loans
  P2PLoan[] activeLoans;
  mapping(P2PLoan => uint256) loanIndex; //starts from 1, 0 means was removed
  mapping(address => ActiveLoan[]) myActiveLoans;
  mapping(address => mapping(P2PLoan => uint256)) myLoanIdx; //starts from 1, 0 means was removed

  //Loan events
  event CreatedLoan(address loanAddress, address loanInitiator, LoanDetails LD);

  constructor() {
    ONR = new LoanONRs(address(this));
  }

  function BorrowLoan(LoanDetails memory _LD) external {
    require(ONR.doesOfferExist(_LD.lender, _LD.id), 'No Offer');
    require(msg.sender == _LD.borrower, 'No behalfs');
    require(ONR.checkOfferLimits(_LD) == true, 'Out of limits');
    P2PLoan newLoan = _initiateLoan(_LD);
    ActiveLoan memory AL;
    AL.loanAddress = newLoan;
    AL.lent = false;
    myActiveLoans[msg.sender].push(AL); //update borrowers list
    myLoanIdx[msg.sender][newLoan] = myActiveLoans[msg.sender].length;
    AL.lent = true;
    myActiveLoans[_LD.lender].push(AL); //update lenders list
    myLoanIdx[_LD.lender][newLoan] = myActiveLoans[_LD.lender].length;

    //Update Offer
    ONR.updateOfferPrincipal(_LD.lender, _LD.id, _LD.principal);
  }

  function LendLoan(LoanDetails memory _LD) external {
    require(ONR.doesRequestExist(_LD.borrower, _LD.id), 'No request');
    require(msg.sender == _LD.lender, 'No behalfs');
    require(ONR.checkRequestLimits(_LD) == true, 'Only requested Amount');
    P2PLoan newLoan = _initiateLoan(_LD);
    ActiveLoan memory AL;
    AL.loanAddress = newLoan;
    AL.lent = false;
    myActiveLoans[_LD.borrower].push(AL); //update borrowers list
    myLoanIdx[_LD.borrower][newLoan] = myActiveLoans[_LD.borrower].length;
    AL.lent = true;
    myActiveLoans[msg.sender].push(AL); //update lenders list
    myLoanIdx[msg.sender][newLoan] = myActiveLoans[msg.sender].length;

    //Update Requests
    ONR.updateRequestPrincipal(_LD.borrower, _LD.id, _LD.principal);
  }

  function _initiateLoan(LoanDetails memory _LD) internal returns (P2PLoan newLoan) {
    newLoan = new P2PLoan(payable(msg.sender), _LD);
    activeLoans.push(newLoan);
    loanIndex[newLoan] = activeLoans.length;
    emit CreatedLoan(address(newLoan), msg.sender, _LD);
  }

  //Getters
  function getLoans() external view returns (P2PLoan[] memory) {
    return activeLoans;
  }

  function getMyLoans() external view returns (ActiveLoan[] memory) {
    return myActiveLoans[msg.sender];
  }

  function getONRsAddr() external view returns (address _ONR) {
    return address(ONR);
  }
}
