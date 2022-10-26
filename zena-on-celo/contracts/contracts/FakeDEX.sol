pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FakeDEX {
    event Bought(uint amount);

    IERC20 _token;
    address _zena;

    constructor(address token, address zena) {
        _token = IERC20(token);
        _zena = zena;
    }

    function buy(uint256 _amount) public payable {
        uint256 dexBalance = _token.balanceOf(address(this));
        require(_amount > 0, "You need to send some tokens");
        require(_amount <= dexBalance, "Not enough tokens in the reserve");
                _token.transfer(_zena, _amount);
        emit Bought(_amount);
    }
