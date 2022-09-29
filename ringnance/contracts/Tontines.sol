// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./Members.sol";
import "./Groups.sol";
import "./Member_Groups.sol";
contract Tontines {

    struct Tontine {
        address payable owner;
        uint tontineId;
        string name;
        uint amount;
        uint beneficyingTimeInterval; 
    }

    mapping (uint => Tontine ) internal tontines;
    uint numberOfTontines = 0;

    function createTontine(string memory _name, uint _amount, uint _beneficyingTimeInterval) public {

        tontines[numberOfTontines] = Tontine (
            payable(msg.sender),
            numberOfTontines+1,
            _name,
            _amount,
            _beneficyingTimeInterval
        );

        //After creating a tontine, the creator(owner) must be set as the first tontine member

        
        numberOfTontines++;

        
        
    }

    function showTontine(uint _tontineId) public view returns(
        address payable,
        string memory,
        uint,
        uint
        
    ){
        return (
            tontines[_tontineId].owner,
            tontines[_tontineId].name,
            tontines[_tontineId].amount,
            tontines[_tontineId].beneficyingTimeInterval
        );  
    }

    function getNumberOfTontines() public view returns (uint) {
        return numberOfTontines;
    }

}