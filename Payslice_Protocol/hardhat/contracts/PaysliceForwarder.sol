// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
pragma abicoder v2; // required to accept struct as function parameter

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";

import "./interfaces/IUniswapV2.sol";
import "./interfaces/ERC20Permit.sol";

///@author Nartey Kodjo-Sarso <narteysarso@gmail.com>
contract PaysliceForwarder is EIP712, Ownable {
    using ECDSA for bytes32;

    struct ForwardRequest {
        address from;
        address to;
        uint256 value;
        uint256 gas;
        uint256 nonce;
        bytes data;
    }

    address public feeToken = 0x25D401b92b9C58521c4F312c18147c069F932206;

    bytes32 private constant _TYPEHASH =
        keccak256(
            "ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)"
        );

    address public exchangeAddress;

    mapping(address => bool) private _relayerAddress;

    mapping(address => uint256) private _nonces;

    modifier _onlyRelayAddress() {
        require(_relayerAddress[_msgSender()], "Only relayer allowed");
        _;
    }

    constructor(address _exchangeAddress) EIP712("PaysliceForwarder", "0.0.1") {
        exchangeAddress = _exchangeAddress;
    }

    function _verifySignature(ForwardRequest memory req, bytes memory signature)
        internal
        view
        returns (address)
    {
        address signer = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    _TYPEHASH,
                    req.from,
                    req.to,
                    req.value,
                    req.gas,
                    req.nonce,
                    keccak256(req.data)
                )
            )
        ).recover(signature);

        return signer;
    }

    function verify(ForwardRequest memory _req, bytes memory _signature)
        public
        view
        returns (bool)
    {
        address signer = _verifySignature(_req, _signature);

        if (_req.from != signer) return false;

        return true;
    }

    function getNonce(address from) public view returns (uint256) {
        return _nonces[from];
    }

    function execute(ForwardRequest memory _req, bytes memory _signature)
        public
        payable
        returns (bool, bytes memory)
    {
        require(
            verify(_req, _signature),
            "PaysliceForwarder: signature does not match request"
        );

        _nonces[_req.from] = _req.nonce + 1;

        (bool success, bytes memory returndata) = _req.to.call{
            gas: _req.gas,
            value: _req.value
        }(abi.encodePacked(_req.data, _req.from));

        // Validate that the relayer has sent enough gas for the call.
        // See https://ronan.eth.limo/blog/ethereum-gas-dangers/
        if (gasleft() <= _req.gas / 63) {
            // We explicitly trigger invalid opcode to consume all gas and bubble-up the effects, since
            // neither revert or assert consume all gas since Solidity 0.8.0
            // https://docs.soliditylang.org/en/v0.8.0/control-structures.html#panic-via-assert-and-error-via-require
            /// @solidity memory-safe-assembly
            assembly {
                invalid()
            }
        }

        return (success, returndata);
    }

    function executeApproval(
        address _paytoken,
        address _owner,
        address _spender,
        uint256 _value,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public returns (bool) {
        ERC20Permit(_paytoken).permit(
            _owner,
            _spender,
            _value,
            _deadline,
            _v,
            _r,
            _s
        );

        return true;
    }

    function executeGasPayment(
        address _paytoken,
        address _owner,
        address _spender,
        uint256 _value,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) public returns (bool) {
        if (
            _paytoken == address(0) ||
            _spender != address(this) ||
            _value == uint(0)
        ) {
            return false;
        }

        bool approvalSuccess = executeApproval(
            _paytoken,
            _owner,
            _spender,
            _value,
            _deadline,
            _v,
            _r,
            _s
        );

        require(approvalSuccess, "Approval Failed");

        (bool transferSuccess, ) = _paytoken.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                _owner,
                address(this),
                _value
            )
        );

        require(transferSuccess, "Failed to deduct gas fees");

        return transferSuccess;
    }

    function convertPaytokenToFeeToken(address _paytoken, uint _value)
        public
        onlyOwner
    {
        (bool approveSuccess, ) = _paytoken.call(
            abi.encodeWithSignature(
                "approve(address,uint256)",
                exchangeAddress,
                _value
            )
        );

        require(approveSuccess, "Failed to approve exchange");

        address[] memory path = new address[](2);
        path[0] = _paytoken;
        path[1] = feeToken;

        IUniswapV2(exchangeAddress).swapExactTokensForTokens(
            _value,
            _value / 1000,
            path,
            address(this)
        );
    }

    function registerRelayer(address _relayer) public onlyOwner returns (bool) {
        require(_relayer != address(0), "Invalid relayer address");
        require(_relayer != address(this), "Forwarder cannot be relayer");
        require(!_relayerAddress[_relayer], "Relayer already added");

        _relayerAddress[_relayer] = true;

        return true;
    }

    function gasCost(uint amountOut, address[] memory path)
        public
        view
        returns (uint[] memory)
    {
        return IUniswapV2(exchangeAddress).getAmountsIn(amountOut, path);
    }

    function withdrawFees(uint _amount, address _to) external onlyOwner {
        require(_to != address(0), "Invalid address");
        require(_amount > 0, "Amount must is not enough");

        uint balance = IERC20(feeToken).balanceOf(address(this));

        require(_amount <= balance, "Available funds not enough");

        (bool transferSuccess, ) = feeToken.call(
            abi.encodeWithSignature("transfer(address,uint)", _to, _amount)
        );

        require(transferSuccess, "Fees withdrawal failed");
    }
}
