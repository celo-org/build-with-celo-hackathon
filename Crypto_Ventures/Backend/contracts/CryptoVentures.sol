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
    mapping(string => mapping(address => uint256)) public capTable;

    //events
    event Invest(address _investor, uint256 _amount, string _fund);
    event CreateFund(string _nameOfFund, address _owner);

    //modifiers
    //check that the investor hasn't staked zero coins
    modifier investmentIsNotThanZero() {
        require(msg.value > 0, "Value must be greater than zero");
        _;
    }

    //Ensure that the investor does not own the fund
    modifier isNotFundOwner(address payable _owner) {
        require(msg.sender != _owner, "Cannot invest in your own fund");
        _;
    }

    //Ensure that only fund owner can invest in a startup
    modifier isFundOwner(string memory _nameOfFund) {
        require(
            msg.sender == funds[msg.sender][_nameOfFund].owner,
            "You do not own this fund"
        );
        _;
    }

    //Create a new fund
    function createFund(string memory _nameOfFund, uint256 _size) external {
        Fund memory newfund = Fund(_nameOfFund, msg.sender, _size);
        funds[msg.sender][_nameOfFund] = newfund;
        total_contributions[_nameOfFund] = 0;
        emit CreateFund(_nameOfFund, msg.sender);
    }

    //Invest in a fund by investor
    function investInFund(address payable _fundOwner, string memory _nameOfFund)
        external
        payable
        investmentIsNotThanZero
        isNotFundOwner(_fundOwner)
    {
        _fundOwner.transfer(msg.value);

        Fund storage _existingFund = funds[_fundOwner][_nameOfFund];

        funders[_nameOfFund][msg.sender] = msg.value;

        total_contributions[_nameOfFund] =
            total_contributions[_nameOfFund] +
            msg.value;

        createCapTable(_existingFund, msg.sender, msg.value);
        emit Invest(msg.sender, msg.value, _nameOfFund);
    }

    /* `investInStartup` - Channels crypto from a fund to a startup's address
     *  _startup: Startups address
     *  _nameOfFund: Fund to channel from
     *
     */
    function investInStartup(
        address payable _startup,
        string memory _nameOfFund
    ) external payable investmentIsNotThanZero isFundOwner(_nameOfFund) {
        _startup.transfer(msg.value);
        total_contributions[_nameOfFund] =
            total_contributions[_nameOfFund] -
            msg.value;
    }

    //check total contributions in a fund
    function getTotContributions(string memory _nameOfFund)
        external
        view
        returns (uint256)
    {
        return (total_contributions[_nameOfFund]);
    }

    //Get how much an investor has contributed to a fund
    function getInvestorsContribution(string memory _nameOfFund)
        external
        view
        returns (uint256)
    {
        return (funders[_nameOfFund][msg.sender]);
    }

    // `createCapTable` - creates a cap table for investors
    //  _fund: Fund to create from
    //  _investorAddress: Address of investor to allocate shares to
    //  _amount: Investor's contribution
    //
    function createCapTable(
        Fund storage _fund,
        address _investorAddress,
        uint256 _amount
    ) internal {
        uint256 share = (_amount * 100) / _fund.size;
        capTable[_fund.name][_investorAddress] = share;
    }

    //Get the individual share of an investor in a fund
    function getShare(string memory _nameOfFund, address _investorAddress)
        external
        view
        returns (uint256)
    {
        return (capTable[_nameOfFund][_investorAddress]);
    }

    receive() external payable {}
}
