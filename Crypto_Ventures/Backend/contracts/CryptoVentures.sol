// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CryptoVentures {
    struct Fund {
        string name;
        address owner;
        uint256 size;
    }

    mapping(address => mapping(string => Fund)) internal funds;
    mapping(string => mapping(address => uint256)) internal funders;
    mapping(string => uint256) internal total_contributions;

    //events
    event Invest(address _investor, uint256 _amount, string _fund);
    event CreateFund(string _nameOfFund, address _owner);

    function createFund(string memory _nameOfFund, uint256 _size) external {
        Fund memory newfund = Fund(_nameOfFund, msg.sender, _size);
        funds[msg.sender][_nameOfFund] = newfund;
        total_contributions[_nameOfFund] = 0;
    }

    function investInFund(address payable _fundOwner, string memory _nameOfFund)
        external
        payable
    {
        _fundOwner.transfer(msg.value);
        funders[_nameOfFund][msg.sender] = msg.value;

        total_contributions[_nameOfFund] =
            total_contributions[_nameOfFund] +
            msg.value;
        emit Invest(msg.sender, msg.value, _nameOfFund);
    }

    function investInStartup(address payable _startup) external payable {
        _startup.transfer(msg.value);
    }

    function getTotContributions(string memory _nameOfFund)
        external
        view
        returns (uint256)
    {
        return (total_contributions[_nameOfFund]);
    }

    function getInvestorsContribution(string memory _nameOfFund)
        external
        view
        returns (uint256)
    {
        return (funders[_nameOfFund][msg.sender]);
    }

    receive() external payable {}
}
