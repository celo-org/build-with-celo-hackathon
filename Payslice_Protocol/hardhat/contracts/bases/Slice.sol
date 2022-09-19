// SPDX-License-Identifier: MIT

/// @author Nartey Kodjo-Sarso

pragma solidity 0.8.15;

import "./access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./data/SharedData.sol";
import "./interface/IExchange.sol";
import "./interface/ERC20.sol";

/// @dev Slice payment manager.
///     
contract Slice is Ownable, SharedData {
    using Counters for Counters.Counter;

    bool public paused = true;
    bool public refund = false;

    string title; 
    address exchangeAddress;
    address targetToken;
    address recipientAddress;
    uint totalReceivable;
    uint totalPaid;
    string description;

    Counters.Counter public payersCount;
    Counters.Counter public transactionsCount;

    struct Payer {
        bytes payeruid;
        uint amountDue;
        uint amountPaid;
    }

    struct Transaction {
        address inputToken;
        address payerAddress;
        address outputToken;
        bytes payeruid;
        uint outputAmount;
        uint inputAmount;
        uint createdAt;
    }

    mapping(uint => Payer) payers;

    mapping(bytes => Payer) public payerOf;

    mapping(uint => Transaction) transactions;

    event PaymentMade(address invoice, uint amount, uint transactonNumber);
    event StatusChange(address invoice, uint8 status);
    event InvoiceCreated(
        address owner,
        address targetToken,
        address tellerAddress
    );

    event PayerAdded(address tellerAddress, bytes payeruid);

    modifier notPaused() {
        require(paused, "Cannot be used at this moment");
        _;
    }

    function initialize(
        bytes32 _name,
        string memory _description,
        address _token,
        address _recipientAddress,
        address _exchangeAddress,
        uint _totalReceivable,
        SPayer[] memory _payers
    ) external {
        name = _name;
        description = _description;
        targetToken = _token;
        recipientAddress = _recipientAddress;
        totalReceivable = _totalReceivable;
        exchangeAddress = _exchangeAddress;

        _initializeOwnable();

        for (uint i = 0; i < _payers.length; i++) {
            addPayer(_payers[i].payeruid, _payers[i].amountDue);
        }
    }

    function makePayment(
        address _inputToken,
        address _sender,
        uint24 _poolFee,
        uint _outputAmount,
        uint _amountInputMaximum,
        bytes calldata _payeruid,
        uint160 _sqrtPriceLimitX96
    ) external notPaused {
        Payer storage _payer = payerOf[_payeruid];
        require(_payer.amountPaid <= _payer.amountDue, "Payment made in full");

        // initialize DEX exchange
        IExchange exchange = IExchange(exchangeAddress);

        uint amountOut = exchange.swapExactInputSingle(
            _inputToken,
            targetToken,
            _sender,
            _poolFee,
            _amountInputMaximum,
            _outputAmount,
            _sqrtPriceLimitX96
        );

        _payer.amountPaid += amountOut;

        totalPaid += amountOut;

        // Track transaction
        Transaction storage transaction = transactions[
            transactionsCount.current()
        ];
        transaction.createdAt = block.timestamp;
        transaction.inputAmount = amountOut;
        transaction.outputAmount = _outputAmount;
        transaction.inputToken = _inputToken;
        transaction.outputToken = targetToken;
        transaction.payeruid = _payeruid;

        // if full amount has been collected, pay recipient
        if (totalPaid >= totalReceivable) {
            // clean paid amount record of all payers
            uint payersNumber = payersCount.current();
            for (uint idx; idx < payersNumber; idx++) {
                payers[idx].amountPaid = 0;
            }

            uint totalCollectedAmount = totalPaid;
            totalPaid = 0;

            ERC20(targetToken).transfer(recipientAddress, totalCollectedAmount);
            
        }

        emit PaymentMade(
            address(this),
            _outputAmount,
            transactionsCount.current()
        );

        transactionsCount.increment();
    }

    function getInvoiceInfo()
        external
        view
        returns (
            bytes32,
            string memory,
            address,
            address,
            address,
            uint,
            uint
        )
    {
        return (
            name,
            description,
            exchangeAddress,
            targetToken,
            recipientAddress,
            totalReceivable,
            totalPaid
        );
    }

    function getTotalPaid() external view returns (uint) {
        return totalPaid;
    }

    /// @dev return payer details
    function getPayer(uint _index)
        external
        view
        returns (
            bytes memory,
            uint,
            uint
        )
    {
        require(_index < payersCount.current(), "Payer not found");

        Payer memory payer = payers[_index];

        return (payer.payeruid, payer.amountDue, payer.amountPaid);
    }

    function updatePause(bool _paused) external onlyOwner {
        paused = _paused;
    }

    function updateRefund(bool _refund) external onlyOwner notPaused {
        // TODO: enable payers to withdraw their money
        refund = _refund;
    }

    function _addPayer(bytes memory _payeruid, uint _amountDue)
        internal
        onlyOwner
        notPaused
    {
        Payer storage payer = payers[payersCount.current()];
        payer.payeruid = _payeruid;
        payer.amountDue = _amountDue;
        payer.amountPaid = 0;
        payersCount.increment();

        payerOf[_payeruid] = payer;

        emit PayerAdded(address(this), _payeruid);
    }
}
