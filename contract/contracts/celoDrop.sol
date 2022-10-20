// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

interface IERC20 {
    function transfer(address _to, uint256 _value) external returns (bool);

    function balanceOf(address account) external view returns (uint256);

    // don't need to define other functions, only using `transfer()` in this case
}

contract CeloDrop {
    // Do not use in production
    // This function can be executed by anyone

    address payable owner;
    address[] public addresses = [0x0000000000000000000000000000000000000000];
    uint256 value = 10**17;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function sendcUSD(address _to) external {
        require(msg.sender == owner);
        IERC20 cUSD = IERC20(
            address(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1)
        );
        IERC20 celo = IERC20(
            address(0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9)
        );
        uint256 celo_balance = celo.balanceOf(address(this));
        uint256 balance = cUSD.balanceOf(address(this));
        require(celo_balance >= value);
        require(balance >= value);

        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == _to) {
                revert("Already Got AirDrop");
            }
            celo_balance -= value;
            balance -= value;
        }
        addresses.push(_to);
        celo.transfer(_to, value);
        cUSD.transfer(_to, value);
    }

    function balanceOf() public view returns (uint256) {
        IERC20 usdc = IERC20(
            address(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1)
        );
        uint256 balance = usdc.balanceOf(address(this));
        return balance;
    }
}
