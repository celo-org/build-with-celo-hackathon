// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./DygnifyConfig.sol";
import "./BaseUpgradeablePausable.sol";
import "./OpportunityOrigination.sol";
import "./OpportunityPool.sol";

contract Investor is BaseUpgradeablePausable {
    DygnifyConfig public dygnifyConfig;
    using ConfigHelper for DygnifyConfig;
    OpportunityOrigination public opportunityOrigination;

    mapping(address => bytes32[]) public investorToOpportunity;

    function initialize(DygnifyConfig _dygnifyConfig) external initializer {
        require(
            address(_dygnifyConfig) != address(0),
            "Invalid config address"
        );
        dygnifyConfig = _dygnifyConfig;
        address owner = dygnifyConfig.dygnifyAdminAddress();
        require(owner != address(0), "Invalid Owner");
        opportunityOrigination = OpportunityOrigination(
            dygnifyConfig.getOpportunityOrigination()
        );
        _BaseUpgradeablePausable_init(owner);
    }


    function addOpportunity(address _investor, bytes32 _id) external {
        address poolAddress = opportunityOrigination.getOpportunityPoolAddress(_id);
        require(_investor != address(0), "Invalid Investor address");
        require(poolAddress != address(0), "Opportunity pool doesn't exist.");
        require(msg.sender == poolAddress, "Given opportunity can only be added by that pool." );
        require(OpportunityPool(poolAddress).isStaking(_investor) == true, "Investor is not having a staking position in provided opportunity.");
        bool exist = isExistInInvestor(_investor, _id);
        if(exist == false){
            investorToOpportunity[_investor].push(_id);
        }
    }
    
    function removeOpportunity(address _investor, bytes32 _id) external {
        address poolAddress = opportunityOrigination.getOpportunityPoolAddress(_id);
        require(_investor != address(0), "Invalid Investor address");
        require(poolAddress != address(0), "Opportunity pool doesn't exist.");
        require(msg.sender == poolAddress, "Given opportunity can only be added by that pool." );
        bool exist = isExistInInvestor(_investor, _id);
        require(exist == true, "Investor doesn't invested in this opportunity.");

        bytes32[] memory opportunities = investorToOpportunity[_investor];

        for (uint256 i = 0; i < opportunities.length; i++) {
            if(opportunities[i] == _id){
                investorToOpportunity[_investor][i] = investorToOpportunity[_investor][opportunities.length - 1];
                delete investorToOpportunity[_investor][opportunities.length - 1];
            }
        }
        
    }

    function getOpportunityOfInvestor(address _investor)external view returns(bytes32[] memory){
        require(_investor != address(0), "Invalid investor address");
        bytes32[] memory opportunities = investorToOpportunity[_investor];
        return opportunities;
    }

    function isExistInInvestor(address _investor, bytes32 _id)public view returns(bool){
        require(_investor != address(0), "Invalid investor address");
        bytes32[] memory opportunities = investorToOpportunity[_investor];
        for (uint256 i = 0; i < opportunities.length; i++) {
            if(opportunities[i] == _id){
                return true;
            }
        }
        return false;
    }
}
