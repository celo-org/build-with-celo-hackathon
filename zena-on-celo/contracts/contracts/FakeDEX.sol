pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FakeDEX {
    event Bought(uint amount);

    IERC20 _bct;
    address _zenaTreasury;

    constructor(address bct, address zenaTreasury) {
        _bct = IERC20(bct);
        _zenaTreasury = zenaTreasury;
    }

    // this fake dex let's you buy testnet BCT tokens
    // and transfer them directly to zena treasury
    function buy(uint256 _amount) public payable {
        uint256 dexBalance = _bct.balanceOf(address(this));
        require(_amount > 0, "You need to send some tokens");
        require(_amount <= dexBalance, "Not enough tokens in the reserve");
                _bct.transfer(_zenaTreasury, _amount);
        emit Bought(_amount);
    }
}