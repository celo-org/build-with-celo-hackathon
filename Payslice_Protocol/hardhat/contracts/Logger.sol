// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.15;
contract Logger {
    address owner;

    bool pause;
   
    modifier notPaused(){
        require(!pause, "LE500");
        _;
    }

    event PaymentMade( address proxy, bytes payeruid, uint amount, uint transactonNumber);
    event StatusChange( address proxy, uint8 status);
    event SliceCreated( address proxy, 
        address owner,
        address recipientAddress,
        uint totalReceivable,
        address targetToken
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


    function LogPaymentMade(address proxy, bytes memory payeruid, uint amount, uint transactonNumber) external notPaused returns (bool){

        emit PaymentMade(proxy,payeruid, amount, transactonNumber);

        return true;
        
    }
    
    function LogStatusChanged(address proxy, uint8 status) external notPaused returns (bool){
        emit StatusChange(proxy, status);
        return true;
    }
    
    function LogSliceCreated(address _proxy,
        address _sender,
        address _recipientAddress,
        uint _totalReceivable,
        address _targetToken
        ) external notPaused returns (bool){
            emit SliceCreated(_proxy, _sender, _recipientAddress, _totalReceivable, _targetToken);
        return true;
    }

    function LogPayerAdded(address proxy, bytes memory payeruid) external notPaused returns (bool){
        emit PayerAdded(proxy, payeruid);
        return true;
    }

}