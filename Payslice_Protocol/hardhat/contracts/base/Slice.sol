// SPDX-License-Identifier: MIT

/// @author Nartey Kodjo-Sarso

pragma solidity 0.8.15;
import "@openzeppelin/contracts/utils/Counters.sol";

import "../Logger.sol";
import "../data/SharedData.sol";
import "../interfaces/IExchange.sol";
import "../interfaces/ERC20.sol";
import "../access/Ownable.sol";

error BridgingNotSupportedYet();
error SafeTransferFromeFailed();
error SafeTransferFailed();

/// @dev Slice payment manager
contract Slice is Ownable {
    using Counters for Counters.Counter;
    
    bool public paused = false;
    bool public refund = false;
    
    address exchangeAddress;
    address targetToken;
    address recipientAddress;
    
    uint recipientAddresschainId;
    uint totalReceivable;
    uint totalPaid;

    string title;
    string description;

    Counters.Counter public payersCount;
    Counters.Counter public transactionsCount;
    Logger public logger;

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

    modifier notPaused() {
        require(!paused, "Cannot be used at this moment");
        _;
    }

    function setupSlice(
        address _token,
        address _recipientAddress,
        uint _recipientAddresschainId,
        address _exchangeAddress,
        address _loggerAddress,
        uint _totalReceivable,
        string memory _title,
        string memory _description,
        SPayer[] memory _payers
    )  external returns (bool) {
        require(owner() == address(0), "Cannot Initialize");
        require(_exchangeAddress != address(0), "Exchange address required");
        require(_recipientAddress != address(0), "Recipient address required");
        require(_recipientAddresschainId != uint(0), "Recipient address chain required");
        require(_payers.length > 0, "Vvoucher should have at least one payer");

        title = _title;
        description = _description;
        targetToken = _token;
        recipientAddress = _recipientAddress;
        totalReceivable = _totalReceivable;
        exchangeAddress = _exchangeAddress;
        logger = Logger(_loggerAddress);
        recipientAddresschainId = _recipientAddresschainId;

        for (uint i = 0; i < _payers.length; i++) {
            _addPayer(_payers[i].payeruid, _payers[i].amountDue);
        }

        setupOwnable();

        logger.LogSliceCreated(address(this), msg.sender, _recipientAddress, _totalReceivable, _token);

        return true;
    }


    function makePayment(
        address _inputToken,
        address _sender,
        uint _outputAmount,
        uint _amountInputMaximum,
        bytes calldata _payeruid,
        address[] memory path
    ) external notPaused {
        Payer storage _payer = payerOf[_payeruid];
        require(_payer.amountPaid <= _payer.amountDue, "Payment made in full");

        uint amountToSend;
        uint tokenUnspent;

        uint chain = block.chainid;

        _safeTransferFrom(_inputToken, _sender, address(this), _amountInputMaximum);

        if(chain != recipientAddresschainId){

            //TODO: use bridge
            revert BridgingNotSupportedYet();

        }else if(_inputToken == targetToken){

              amountToSend = _outputAmount;          

        }else {
            // initialize DEX exchange
            IExchange exchange = IExchange(exchangeAddress);

            //Approve exchange to allowance
            ERC20(_inputToken).approve(exchangeAddress, _amountInputMaximum);
            
            uint[] memory amounts = exchange.swapExactInputSingle(
                _outputAmount,
                _amountInputMaximum,
                path,
                address(this)
            );

            //Remove exchange allowance
            ERC20(_inputToken).approve(exchangeAddress, 0);

            // last index is the amount sent to the targetToken
            amountToSend = _outputAmount;

            tokenUnspent = _amountInputMaximum - amounts[0];

        }

        _payer.amountPaid += amountToSend;

        totalPaid += amountToSend;

        // Track transaction
        Transaction storage transaction = transactions[
            transactionsCount.current()
        ];
        transaction.createdAt = block.timestamp;
        transaction.inputAmount = amountToSend;
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

            _safeTransfer(targetToken, recipientAddress, totalCollectedAmount);
            
        }

         //send back unspent tokens
        if(tokenUnspent > 0){
            _safeTransfer(_inputToken, _sender, tokenUnspent);
        }

        logger.LogPaymentMade(
            address(this),
            _payeruid,
            _outputAmount,
            transactionsCount.current()
        );

        transactionsCount.increment();
    }

    function getSliceInfo()
        external
        view
        returns (
            string memory,
            string memory,
            address,
            address,
            address,
            uint,
            uint
        )
    {
        return (
            title,
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
        private
    {
        Payer storage payer = payers[payersCount.current()];
        payer.payeruid = _payeruid;
        payer.amountDue = _amountDue;
        payer.amountPaid = 0;
        payersCount.increment();

        payerOf[_payeruid] = payer;

        logger.LogPayerAdded(address(this), _payeruid);
    }
    function addPayer(bytes memory _payeruid, uint _amountDue)
        internal
        onlyOwner
        notPaused
    {
       _addPayer(_payeruid, _amountDue);

        logger.LogPayerAdded(address(this), _payeruid);
    }

    function getPath(address _inputToken, address _targetToken) private pure returns (address[] memory path){
        path[0] = _inputToken;
        path[1] = _targetToken;
    }

    function _safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                from,
                to,
                value
            )
        );
        if (!success || (data.length != 0 && !abi.decode(data, (bool))))
            revert SafeTransferFromeFailed();
    }

    function _safeTransfer(
        address token,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSignature(
                "transfer(address,uint256)",
                to,
                value
            )
        );
        if (!success || (data.length != 0 && !abi.decode(data, (bool))))
            revert SafeTransferFailed();
    }
}
