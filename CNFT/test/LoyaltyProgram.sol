pragma solidity ^0.8.0;

import "./LoyaltyToken.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "./Token.sol";

/**
@notice This contract is the responsible for rewarding users, and acts as a middleman during a transaction between payer and vendor.
@title LoyaltyProgram
 */
contract LoyaltyProgram {
    LoyaltyToken public immutable loyaltyToken;
    Token public immutable token;

    mapping(address => bool) public isVendorRegistered;

    constructor(Token _token) {
        loyaltyToken = new LoyaltyToken();
        token = _token;
    }

    /**
        @notice function to register vendor, if already registered reverts.
     */
    function registerVendor() external {
        require(!isVendorRegistered[msg.sender], "VENDOR_ALREADY_REGISTERED");
        isVendorRegistered[msg.sender] = true;
        emit VendorRegistered(msg.sender);
    }

    /**
        @notice function to make transactions via vendor relayer, permit is called on the respective token and the transfer is made along with rewarding the user.
        @param payer the person paying for goods & services
        @param amount the amount involved in the transaction
        @param deadline the time by which the signed transaction needs to utilized
    */
    function payViaSignature(
        address payer,
        uint256 amount,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(isVendorRegistered[msg.sender], "ONLY_VENDORS_CAN_RELAY");
        token.permit(payer, address(this), amount, deadline, v, r, s);
        token.transferFrom(payer, msg.sender, amount);
        loyaltyToken.rewardUser(payer, (amount * 10) / 100);
        emit Transaction(payer, msg.sender, amount);
        emit Rewarded(payer, (amount * 10) / 100);
    }

    event VendorRegistered(address indexed vendor);
    event Transaction(
        address indexed payer,
        address indexed vendor,
        uint256 indexed amount
    );
    event Rewarded(address indexed payer, uint256 indexed amount);
}