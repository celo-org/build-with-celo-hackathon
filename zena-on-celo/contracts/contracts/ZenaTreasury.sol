// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ZenaToken is ERC20, ERC20Burnable, Ownable {
    address _zena;

    constructor(address zena) ERC20("Zena", "ZENA") {
        _zena = zena;
         // mint fixed supply to Zena treasuy
        _mint(_zena, 100000 * 10**18);
    }

    
}


contract ZenaTreasury is Ownable {
    event Received(address, uint256);

    IERC20 _token;

    constructor() {
        _token = new ZenaToken(address(this));
        // _token = IERC20(token);
    }

    fallback() external payable {
        // React to receiving BCT from funder
        emit Received(msg.sender, msg.value);
        
        //  TODO 
        //  Zena token as a gift back to funder
        //  uint256 dexBalance = _token.balanceOf(address(this));
        //  require(msg.value <= dexBalance, "Not enough tokens in the reserve");
        //  _token.transfer(msg.sender, msg.value);
    }
}
