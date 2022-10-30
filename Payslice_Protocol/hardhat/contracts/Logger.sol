// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.15;
contract Logger {
    address owner;

    bool pause;
   
    modifier notPaused(){
        require(!pause, "LE500");
        _;
    }

    event PaymentMade( address indexed proxy, bytes indexed payeruid, uint amount, uint amountPaid, uint transactonNumber);
    event StatusChange( address indexed proxy, uint8 indexed status);
    event SliceCreated( 
        address indexed proxy, 
        address indexed owner,
        address indexed recipientAddress,
        uint totalReceivable,
        address targetToken,
        bytes userdata
    );
    event PayerAdded(address proxy, bytes payeruid);

    constructor(){
        owner = msg.sender;
    }

    function setPause(bool _pause) external returns (bool){
        require(owner == msg.sender, "LE402");

        pause = _pause;

        return pause;
    }


    function LogPaymentMade(address proxy, bytes memory payeruid, uint amount, uint amountPaid, uint transactonNumber) external notPaused returns (bool){

        emit PaymentMade(proxy,payeruid, amount, amountPaid, transactonNumber);

        return true;
        
    }
    
    function LogStatusChanged(address proxy, uint8 status) external notPaused returns (bool){
        emit StatusChange(proxy, status);
        return true;
    }
    
    function LogSliceCreated(
        address _proxy,
        address _sender,
        address _recipientAddress,
        uint _totalReceivable,
        address _targetToken,
        bytes calldata userdata
        ) external notPaused returns (bool){
            emit SliceCreated(_proxy, _sender, _recipientAddress, _totalReceivable, _targetToken, userdata);
        return true;
    }

    function LogPayerAdded(address proxy, bytes memory payeruid) external notPaused returns (bool){
        emit PayerAdded(proxy, payeruid);
        return true;
    }

}