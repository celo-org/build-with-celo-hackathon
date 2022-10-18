//SPDX-Licence-Identifier: MIT
pragma solidity^0.8.4;

contract AgroforestSystem{
    address public owner;
    string public name;
    uint[10] public agroforests;
    //string public steward;
    //string public species;

    constructor(string memory _name, address _owner){
        name = _name;
        owner = msg.sender;
    }

    function addsaf(string memory _name, uint [] memory _agroforests)public{
        name = _name;
        agroforests = _agroforests.push();
    }

    function getsaf() view public returns(uint [] memory _agroforests){
        return agroforests;
    }    
}
