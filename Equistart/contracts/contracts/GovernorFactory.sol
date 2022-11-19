// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernorFactory is Ownable {
    
    uint numOfGovernors;
    struct GovernorMeta {
        address governor;
        address timelock;
        address token;
    }
    mapping(uint => GovernorMeta) private deployedContracts;
    event newGovernorCreated(address governor);

    function addGovernorAddress(address _governor, address _timelock,address _token ) public {
        uint governorId = numOfGovernors++;
        GovernorMeta storage currentGovernor = deployedContracts[governorId];
        currentGovernor.governor = _governor;
        currentGovernor.timelock = _timelock;
        currentGovernor.token = _token;
        emit newGovernorCreated(_governor);
    }

    function getAllDeployedGovernor () public view returns (GovernorMeta[] memory props){
        props = new GovernorMeta[](numOfGovernors);
        for(uint256 index=0; index<numOfGovernors; index++){
            props[index]= deployedContracts[index];
        }
    }
}