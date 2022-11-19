// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./CloneFactory.sol"; 
import "./ERC20Token.sol";

contract TokenFactory is Ownable, CloneFactory {

    address public masterERC20Token;

    event TokenCreated(address newToken);

    // constructor(string memory name, string memory symbol, uint supply, address owner)public{
    //     ERC20Token.initialize(name, symbol, supply, owner);
    // }
    
    constructor(address _masterContract){
        masterERC20Token = _masterContract;
    }

    function setMasterToken(address _masterToken) public onlyOwner{
        masterERC20Token = _masterToken;
    }

    function createTokenClone(string memory name, string memory symbol, uint supply, address owner) public {
        address clone = createClone(masterERC20Token);
        ERC20Token(payable(clone)).initialize(name, symbol, supply, owner);
        emit TokenCreated(clone);
    }

}

//TODO: Add Proxy Factory Contract.
//Deploy timelock (time, [input], [input]);
//Deploy Governor (token, timelock);
//Add governor to timelock proposer.