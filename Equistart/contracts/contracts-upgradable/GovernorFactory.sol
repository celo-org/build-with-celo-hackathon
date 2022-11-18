// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

// import "@openzeppelin/contracts@4.7.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "./CloneFactory.sol"; 
import "./MyGovernor.sol";

contract GovernorFactory is Ownable, CloneFactory {
    // address public masterTimelock;

    // event TimelockCreated(address newTimelock);

    // function setTimelockAddress(address _masterTimelock) public onlyOwner{
    //     masterTimelock = _masterTimelock;
    // }

    // function createTimelockClone(uint256 _delay, address[] calldata proposers, address[] calldata executors) external {
    //     TimelockController clone = TimelockController(createClone(masterTimelock));
    //     clone.initialize(_delay, proposers, executors);
    //     TimelockCreated(clone);
    // }

    address public masterGovernor;

    event GovernorCreated(address newGovernor);

    function setMasterGovernor(address _masterGovernor) public onlyOwner{
        masterGovernor = _masterGovernor;
    }

    function createGovernorClone(IVotes _token, TimelockController _timelock) public {
        address clone = createClone(masterGovernor);
        MyGovernor(payable(clone)).init(_token, _timelock);
        GovernorCreated(clone);
    }

}

//TODO: Add Proxy Factory Contract.
//Deploy timelock (time, [input], [input]);
//Deploy Governor (token, timelock);
//Add governor to timelock proposer.