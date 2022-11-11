// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IToucanCarbonOffsets.sol";

contract AMA_SponsorEscrow {
    enum State {
        PENDING,
        ACTIVE,
        DISPUTE,
        COMPLETE,
        CANCEL
    }

    // Drafting with cUSD until green partner is chosen
    enum Asset {
        NCT
    }

    struct Escrow {
        address payable sponsor;
        address payable partner;
        string title;
        // status for approval by stakeholders
        bool amaApproved;
        // bool sponsorApproval;  // default to true

        // Locked up funds
        Asset currency; // Asset type: CELO, cUSD, Green token
        uint256 funds; // in wei
        uint256 fees; // platform fees
        State escrowState; // Status for escrow transaction
        uint256 settlementTime; // epoch time
    }

    address payable partnerAddr; // we'll transfer tokens to this address

    address public ama_addr;
    address payable ama_escrowFeeAddr; // Our Fees are taken here
    address ama_contractAddr;

    //ToucanNCT Celo: 0x02De4766C272abc10Bc88c220D214A26960a7e92
    //IERC20 based token
    IToucanCarbonOffsets ToucanNCT = IToucanCarbonOffsets(0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5); // Toucan Alfajores contract address
    // view: https://alfajores.celoscan.io/address/0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5

    uint256 public nEscrow;
    mapping(uint256 => Escrow) public escrows; // List of escrows the sponsor has
    //track when a user can request again
    mapping(address => uint256) public lockTime;

    mapping(uint256 => address) public escrowSponsor; // List of escrows to traverse to match sponsor

    constructor() {
        //address ama_callerAddr = 0xca8B0f4885DBef091b090395170AFE85cd1D011E;
        ama_addr = msg.sender; //ama_callerAddr;//
        nEscrow = 0; // Starts with 0;
        ama_escrowFeeAddr = payable(0x7dbC9C5d22ea26DcA7D9F5fA1c321Bc6A6ccd2FE);
    }

    function create(
        //address payable sponsor,
        string memory title,
        uint256 value,
        uint256 settlementTime
    ) public payable onlyWhitelisted {
        address payable sponsor = payable(msg.sender);
        require(sponsor != ama_addr, "Platform can't make an escrow. Only a sponsor can.");

        nEscrow = nEscrow + 1; // Create new escrow;

        Escrow memory newEscrow;
        newEscrow.sponsor = sponsor;
        newEscrow.partner = partnerAddr;
        newEscrow.amaApproved = true;
        //--- Later phase: make initially false to allow team to review
        // newEscrow.sponsorApproval = false;

        newEscrow.title = title;

        newEscrow.currency = Asset.NCT;
        newEscrow.fees = value / 100 * 15; // service fee of 15%
        newEscrow.funds = value - newEscrow.fees; // Lock up funds

        // Front end should have allowance and approve _value via Web3
        uint256 treeBalance = ToucanNCT.balanceOf(msg.sender);
        require(value <= treeBalance, "Insufficient funds");
        ToucanNCT.transferFrom(msg.sender, address(this), value);  // Lock up NCTs TCO2 to this SC addr


        newEscrow.settlementTime = settlementTime;
        newEscrow.escrowState = State.ACTIVE;
        //-- Later phase: make initially State.PENDING; team should approve before becoming available in the app
        escrows[nEscrow] = newEscrow;
        escrowSponsor[nEscrow-1] = sponsor;
    }

    function setTitle(uint256 id, string memory title) public onlySponsor(id) returns (bool) {
        require(escrows[id].sponsor != address(0), "Escrow: Invalid Escrow");
        escrows[id].title = title;
        return true;
    }

    function setComplete(uint256 id) public onlyAMA(id) escrowStateCheck(id, State.ACTIVE) returns (bool) {
        // escrows[id].sponsorApproval = true; // Siging that contract approves
        //-- Emit event: oracle to inform sponsor to create a new fund
        escrows[id].escrowState = State.COMPLETE;

        return true;
    }

    function approve(uint256 id) public onlyStakeholder(id) escrowStateCheck(id, State.ACTIVE) returns (bool) {
        // if (msg.sender == escrows[id].sponsor){
        //     escrows[id].sponsorApproval = true;
        // } else
        if (msg.sender == ama_addr) {
            escrows[id].amaApproved = true;
        }
        return true;
    }

    function reject(uint256 id) public onlyStakeholder(id) escrowStateCheck(id, State.ACTIVE) returns (bool) {
        // if (msg.sender == escrows[id].sponsor){
        //     escrows[id].sponsorApproval = false;
        // } else
        if (msg.sender == ama_addr) {
            escrows[id].amaApproved = false;
        }
        return true;
    }

    function cancel(uint256 id) public onlySponsor(id) {
        if (escrows[id].currency == Asset.NCT) {
            ToucanNCT.allowance(address(this), payable(ama_addr));
            ToucanNCT.allowance(address(this), ama_escrowFeeAddr);
            ToucanNCT.transfer(payable(ama_addr), escrows[id].funds);
            ToucanNCT.transfer(ama_escrowFeeAddr, escrows[id].fees);
        }

        // Reset funds
        escrows[id].funds = 0;
        escrows[id].funds = 0;
        escrows[id].escrowState = State.CANCEL;
    }

    function releaseFunds(uint256 id) public onlyWhitelisted escrowStateCheck(id, State.ACTIVE) {
        if (
            escrows[id].amaApproved
            //&& escrows[id].sponsorApproval
        ) {
            // Everyone must Approve
            // Retire TCOs and take our fee
            if (escrows[id].currency == Asset.NCT) {
                //ToucanNCT.allowance(address(this), escrows[id].partner);
                //ToucanNCT.allowance(address(this), ama_escrowFeeAddr);
                //ToucanNCT.transfer(escrows[id].partner, escrows[id].funds);
                ToucanNCT.transfer(ama_escrowFeeAddr, escrows[id].fees);
                ToucanNCT.retireFrom(address(this), escrows[id].funds);

                emit SponorshipRetired(address(this), escrows[id].sponsor, id, escrows[id].funds);
            }

            escrows[id].funds = 0;
            escrows[id].fees = 0;
            escrows[id].escrowState = State.COMPLETE;

            //-- Emit event: oracle to inform sponsor to create new fund
        }
    }

    event SponorshipRetired(
        address who,
        address sponsor,
        uint256 escrow,
        uint256 amount
    );


    /**
     * @notice returns the portion of the request available
     */
    function userFaucet(uint256 id, uint256 trees) public onlyWhitelisted returns (uint256) {
        //** limit requests for funds per address per period
        //1 'Trees' = 8 seedlings in the app

        uint256 debitValue = trees; // 1 tree = 1 ton.

        require(escrows[id].escrowState == State.ACTIVE, "Escrow unavailable to faucet");
        require(debitValue <= 1, "Request level exceeded");
        require(block.timestamp > lockTime[msg.sender], "You can't request again so soon. Please try again later");

        uint256 funds = escrows[id].funds;
        if (debitValue > funds) {
            debitValue = funds;
            releaseFunds(id); // close the fund
        }
        escrows[id].funds = escrows[id].funds - debitValue;

        //keep this user out for a while
        lockTime[msg.sender] = block.timestamp + 4 hours;

        return debitValue;
    }

    modifier onlyWhitelisted() {
        //**  Mock for testing until whitelist implemented
        //require(msg.sender != ama_addr, "Only whitelisted users and clients can call this method."  );
        _;
    }

    // modifier onlyClient() {
    //     require(msg.sender == ama_addr, "Only client can call this method");
    //     _;
    // }

    modifier onlySponsor(uint256 id) {
        require(escrows[id].sponsor == msg.sender, "Only sponsor can call this method");
        _;
    }

    modifier onlyAMA(uint256 id) {
        require(ama_addr == msg.sender, "Only AMA platform can call this method");
        _;
    }

    modifier onlyStakeholder(uint256 id) {
        require(
            escrows[id].sponsor == msg.sender || ama_addr == msg.sender,
            "Only sponsor or platform can call this method"
        );
        _;
    }

    modifier escrowStateCheck(uint256 id, State _state) {
        require(escrows[id].escrowState == _state, "Wrong state.");
        _;
    }
}
