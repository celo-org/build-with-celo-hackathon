/*
This file is part of DAO

The DAO is free software: you can redistribute it and/or modify
it under the terms of the GNU lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The DAO is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU lesser General Public License for more details.

You should have received a copy of the GNU lesser General Public License
along with the DAO.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
Standard smart contract for a Decentralized Autonomous Organization (DAO)
to automate organizational governance and decision-making.
*/

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DAOInterface {
    uint constant minProposalDebatePeriod = 2 weeks;
    uint constant quorumHalvingPeriod = 25 weeks;
    uint constant executeProposalPeriod = 10 days;
    uint constant preSupportTime = 2 days;
    uint constant maxDepositDivisor = 100;
    
    Proposal[] public proposals;
    uint public minQuorumDivisor;
    uint public lastTimeMinQuorumMet;
    address public curator;
    
    mapping (address => bool) public allowedRecipients;
    mapping (address => uint) public blocked;
    mapping (address => uint[]) public votingRegister;
    
    uint public proposalDeposit;
    uint sumOfProposalDeposits;
    
    
    struct Proposal {
        address recipient;
        uint amount;
        string description;
        uint votingDeadline;
        bool open;
        bool proposalPassed;
        bytes32 proposalHash;
        uint proposalDeposit;
        bool newCurator;
        bool preSupport;
        uint yea;
        uint nay;
        mapping (address=> bool) votedYes;
        mapping(address=> bool) votedNo;
        address creator;
    }
    
    
    
    
}


