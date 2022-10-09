//SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "./interfaces/TreasuryStorageV2.sol";

contract TreasuryImplementation is
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    TreasuryStorageV2
{
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using EnumerableSet for EnumerableSet.AddressSet;

    /**
     * @notice Triggered when CommunityAdmin has been updated
     *
     * @param oldCommunityAdmin   Old communityAdmin address
     * @param newCommunityAdmin   New communityAdmin address
     */
    event CommunityAdminUpdated(
        address indexed oldCommunityAdmin,
        address indexed newCommunityAdmin
    );

    /**
     * @notice Triggered when UniswapRouter has been updated
     *
     * @param oldUniswapRouter   Old uniswapRouter address
     * @param newUniswapRouter   New uniswapRouter address
     */
    event UniswapRouterUpdated(address indexed oldUniswapRouter, address indexed newUniswapRouter);

    /**
     * @notice Triggered when an amount of an ERC20 has been transferred from this contract to an address
     *
     * @param token               ERC20 token address
     * @param to                  Address of the receiver
     * @param amount              Amount of the transaction
     */
    event TransferERC20(address indexed token, address indexed to, uint256 amount);

    /**
     * @notice Triggered when a token has been set
     *
     * @param tokenAddress        Address of the token
     * @param oldRate            Old token rate value
     * @param oldExchangePath    Old token exchange path
     * @param newRate            New token rate value
     * @param newExchangePath    New token exchange path
     */
    event TokenSet(
        address indexed tokenAddress,
        uint256 oldRate,
        address[] oldExchangePath,
        uint256 newRate,
        address[] newExchangePath
    );

    /**
     * @notice Triggered when a token has been removed
     *
     * @param tokenAddress        Address of the token
     */
    event TokenRemoved(address indexed tokenAddress);

    /**
     * @notice Triggered when a token has been set
     *
     * @param tokenAddress           Address of the token
     * @param amountIn               Amount changed
     * @param amountOutMin           Minimum amount out
     * @param exchangePath           Exchange path
     * @param approximateAmountsOut  Approximate value of the final amount out
     */
    event AmountConverted(
        address indexed tokenAddress,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] exchangePath,
        uint256 approximateAmountsOut
    );

    /**
     * @notice Enforces sender to be communityAdmin
     */
    modifier onlyCommunityAdmin() {
        require(msg.sender == address(communityAdmin), "Treasury: NOT_COMMUNITY_ADMIN");
        _;
    }

    /**
     * @notice Enforces sender to be communityAdmin or owner
     */
    modifier onlyCommunityAdminOrOwner() {
        require(
            msg.sender == address(communityAdmin) || msg.sender == owner(),
            "Treasury: NOT_COMMUNITY_ADMIN AND NOT_OWNER"
        );
        _;
    }

    /**
     * @notice Used to initialize a new Treasury contract
     *
     * @param _communityAdmin    Address of the CommunityAdmin contract
     */
    function initialize(ICommunityAdmin _communityAdmin) public initializer {
        __Ownable_init();
        __ReentrancyGuard_init();

        communityAdmin = _communityAdmin;
    }

    /**
     * @notice Returns the current implementation version
     */
    function getVersion() external pure override returns (uint256) {
        return 2;
    }

    /**
     * @notice Returns if an address is an accepted token
     *
     * @param _tokenAddress token address to be checked
     * @return bool true if the tokenAddress is an accepted token
     */
    function isToken(address _tokenAddress) external view override returns (bool) {
        return _tokenList.contains(_tokenAddress);
    }

    /**
     * @notice Returns the address of a token from tokenList
     *
     * @param _index index of the token
     * @return address of the token
     */
    function tokenListAt(uint256 _index) external view override returns (address) {
        return _tokenList.at(_index);
    }

    /**
     * @notice Returns the number of tokens
     *
     * @return uint256 number of tokens
     */
    function tokenListLength() external view override returns (uint256) {
        return _tokenList.length();
    }

    /**
     * @notice Returns the details of a token
     *
     * @param _tokenAddress address of the token
     * @return rate of the token
     * @return exchangePath of the token
     */
    function tokens(address _tokenAddress)
        external
        view
        override
        returns (uint256 rate, address[] memory exchangePath)
    {
        return (_tokens[_tokenAddress].rate, _tokens[_tokenAddress].exchangePath);
    }

    /**
     * @notice Updates the CommunityAdmin contract address
     *
     * @param _newCommunityAdmin address of the new CommunityAdmin contract
     */
    function updateCommunityAdmin(ICommunityAdmin _newCommunityAdmin) external override onlyOwner {
        emit CommunityAdminUpdated(address(communityAdmin), address(_newCommunityAdmin));
        communityAdmin = _newCommunityAdmin;
    }

    /**
     * @notice Updates the UniswapRouter contract address
     *
     * @param _newUniswapRouter address of the new UniswapRouter contract
     */
    function updateUniswapRouter(IUniswapV2Router _newUniswapRouter) external override onlyOwner {
        emit UniswapRouterUpdated(address(uniswapRouter), address(_newUniswapRouter));
        uniswapRouter = _newUniswapRouter;
    }

    /**
     * @notice Transfers an amount of an ERC20 from this contract to an address
     *
     * @param _token address of the ERC20 token
     * @param _to address of the receiver
     * @param _amount amount of the transaction
     */
    function transfer(
        IERC20 _token,
        address _to,
        uint256 _amount
    ) external override onlyCommunityAdminOrOwner nonReentrant {
        IERC20Upgradeable(address(_token)).safeTransfer(_to, _amount);

        emit TransferERC20(address(_token), _to, _amount);
    }

    function setToken(
        address _tokenAddress,
        uint256 _rate,
        address[] calldata _exchangePath
    ) external override onlyOwner {
        require(_rate > 0, "Treasury::setToken: invalid rate");

        if (_exchangePath.length > 0) {
            require(
                _exchangePath.length > 1 && _exchangePath[0] == _tokenAddress,
                "Treasury::setToken: invalid exchangePath"
            );

            uint256[] memory _amounts = uniswapRouter.getAmountsOut(1e18, _exchangePath);
            require(_amounts[_amounts.length - 1] > 0, "Treasury::setToken: invalid exchangePath");
        }

        emit TokenSet(
            _tokenAddress,
            _tokens[_tokenAddress].rate,
            _tokens[_tokenAddress].exchangePath,
            _rate,
            _exchangePath
        );

        _tokens[_tokenAddress].rate = _rate;
        _tokens[_tokenAddress].exchangePath = _exchangePath;

        _tokenList.add(_tokenAddress);
    }

    function removeToken(address _tokenAddress) external override onlyOwner {
        require(_tokenList.contains(_tokenAddress), "Treasury::removeToken: this is not a token");

        _tokens[_tokenAddress].rate = 0;
        delete _tokens[_tokenAddress].exchangePath;

        _tokenList.remove(_tokenAddress);

        emit TokenRemoved(_tokenAddress);
    }

    function getConvertedAmount(address _tokenAddress, uint256 _amount)
        external
        view
        override
        returns (uint256)
    {
        require(
            _tokenList.contains(_tokenAddress),
            "Treasury::getConvertedAmount: this is not a valid token"
        );

        Token memory _token = _tokens[_tokenAddress];

        uint256 _convertedAmount;
        if (_token.exchangePath.length == 0) {
            _convertedAmount = _amount;
        } else {
            uint256[] memory _amountsOut = uniswapRouter.getAmountsOut(
                _amount,
                _token.exchangePath
            );
            _convertedAmount = _amountsOut[_amountsOut.length - 1];
        }

        return (_convertedAmount * _token.rate) / 1e18;
    }

    function convertAmount(
        address _tokenAddress,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address[] memory _exchangePath,
        uint256 _deadline
    ) external override onlyOwner {
        require(
            _tokenList.contains(_tokenAddress),
            "Treasury::convertAmount: this is not a valid token"
        );

        if (_exchangePath.length == 0) {
            _exchangePath = _tokens[_tokenAddress].exchangePath;
        }

        if (_deadline == 0) {
            _deadline = block.timestamp + 3600;
        }

        uint256[] memory _amountsOut = uniswapRouter.getAmountsOut(_amountIn, _exchangePath);

        IERC20(_tokenAddress).approve(address(uniswapRouter), _amountIn);
        uniswapRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            _amountIn,
            _amountOutMin,
            _exchangePath,
            address(this),
            _deadline
        );

        emit AmountConverted(
            _tokenAddress,
            _amountIn,
            _amountOutMin,
            _exchangePath,
            _amountsOut[_amountsOut.length - 1]
        );
    }
}
