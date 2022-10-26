pragma solidity ^0.8.17;

contract FakeDEX {
    function fundContract() external payable {

    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function transferAmount(address payable _recipient, uint256 _amount)
        external
    {
        _recipient.transfer(_amount);
    }

    function callAmount(address payable _recipient) external payable {
        (bool success, bytes memory data) = _recipient.call{value: msg.value}(
            ""
        );
        require(success, "Transaction Failed!");
    }
}
