// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./Crowdsale.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrowdsaleFactory is Ownable{
    
    uint numOfCrowdsale;

    struct crowdsaleMeta {
        ERC20 token;
        uint rate;
        address beneficiaryAddr;
        address crowdsaleContractAddr;
    }

    mapping(uint => crowdsaleMeta) private deployedCrowdsale;

    event newCrowdSaleCreatedAt(address crowdsaleContract );


    // constructor(){
    //     // TODO: Add the owner as msg.sender from Ownable contract
    // }


    function createCrowdSale(uint256 _rate, address _wallet, ERC20 _token) public {
        uint crowdsaleId = numOfCrowdsale++;
        crowdsaleMeta storage currentCrowdsale = deployedCrowdsale[crowdsaleId];
        currentCrowdsale.token = _token;
        currentCrowdsale.rate = _rate;
        currentCrowdsale.beneficiaryAddr = _wallet;
        currentCrowdsale.crowdsaleContractAddr = address(new Crowdsale(_rate, _wallet, _token));
        emit newCrowdSaleCreatedAt(currentCrowdsale.crowdsaleContractAddr);

    }

    function getAllDeployedProjects () public view returns (crowdsaleMeta[] memory props){
        // return deployedProjects;
        props = new crowdsaleMeta[](numOfCrowdsale);
        
        for (uint256 index =0; index< numOfCrowdsale; index++){
            props[index] = deployedCrowdsale[index];
        }
    }

}
