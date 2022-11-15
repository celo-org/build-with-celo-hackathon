// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "./WalletProxy.sol";
import "hardhat/console.sol";

contract GidiFactory is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable
{
    address public cUSDAddress;

    address public walletImp;

    mapping(string => address) public wallets;

    event NewWallet(string uuid, address wallet);

    struct Request {
        uint256 category_id;
        uint256 subcategory_id;
        uint256 quantity;
        uint256 total_amount;
        string description_ipfs_id;
        uint256 collection_center_id;
        uint256 expiry_time;
        uint256 lock_amount;
    }

    Request[] public requests;

    //Organization wallet -> Array of Requests ID
    mapping(address => uint256[]) public organizationRequests;

    struct Delivery {
        uint256 quantity;
        uint256 paymentDue;
        string proof_ipfs_id;
        uint256 time;
        uint256 request_id;
        bool payment_declined;
        bool payment_claimed;
        address collector_address;
    }

    Delivery[] public deliveries;

    mapping (uint256 => uint256[]) requestDeliveries;

    mapping (address => mapping(uint256 => uint256[])) collectorDeliveries;

    event NewDelivery(uint256 indexed deliveryId, address indexed collector);

    event NewRequest(uint256 indexed request, address indexed organization);

    function initialize(address _walletImp) public initializer {
        walletImp = _walletImp;

        __Ownable_init();
        __Pausable_init();
    }

    function updateCusdAddress(address _cUsd) public onlyOwner returns (bool) {
        cUSDAddress = _cUsd;

        return true;
    }

    function updateWalletImplementation(address _walletImp)
        public
        onlyOwner
        returns (bool)
    {
        walletImp = _walletImp;

        return true;
    }

    function pause() public onlyOwner returns (bool) {
        _pause();

        return true;
    }

    function newWallet(string memory uuid) public onlyOwner returns (bool) {
        require(bytes(uuid).length >= 32, "XF: Invalid uuid");

        address wallet = address(new WalletProxy(address(this)));

        wallets[uuid] = wallet;

        emit NewWallet(uuid, wallet);

        return true;
    }

    //Called by scrap company
    function newRequest(uint256 categoryId, uint256 subcategoryId, uint256 quantity, uint256 total, string memory descriptionIpfsId, uint256 collectionCenterId, uint256 expiryTime) public returns (uint256 requestId) {
        
        IERC20Upgradeable(cUSDAddress).approve(address(this), total);
        
        uint256 index = requests.length;

        requests.push(Request(categoryId, subcategoryId, quantity, total, descriptionIpfsId, collectionCenterId,expiryTime, total));

        organizationRequests[msg.sender].push(index);

        //Escrow funds
        IERC20Upgradeable(cUSDAddress).transferFrom(msg.sender,address(this), total);

        emit NewRequest(index, msg.sender);
        
        return index;
    }

    //Called by Factory owner for scrap collectors
    function newDelivery(address collector, uint256 quantity, uint256 paymentDue, string memory proofIpfsId, uint256 requestId) public onlyOwner returns (uint256) {
        require(requests[requestId].quantity >= quantity,"GF: Insufficient quantity");
        require(requests[requestId].lock_amount >= paymentDue,"GF: Insufficient liquidity");

        uint256 index = requests.length;

        deliveries.push(Delivery(quantity, paymentDue, proofIpfsId, block.timestamp, requestId, false, false, collector));

        requestDeliveries[requestId].push(index);
        collectorDeliveries[collector][requestId].push(index);

        emit NewDelivery(index, collector);

        return index;
    }

    function isPayoutApproved(uint256 deliveryId)  public view returns (bool approved) {
        if(deliveries[deliveryId].payment_claimed == true) return false;
        if(deliveries[deliveryId].payment_declined == true) return false;
        if(deliveries[deliveryId].payment_claimed == false && deliveries[deliveryId].payment_declined == false && deliveries[deliveryId].time > block.timestamp) return true;
    }
}