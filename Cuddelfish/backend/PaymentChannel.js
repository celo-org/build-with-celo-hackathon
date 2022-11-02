class PaymentChannel {
    constructor(_channelID, _channelBalance, _userID, _publicKey){
        this.channelID = _channelID;
        this.channelBalance = _channelBalance;
        this.balanceUsed = 0;
        this.userID = _userID;
        this.publicKey = _publicKey;
        this.transactions = [];
    }
}


/*
+channelID: uint 
+channelBalance: uint 
+balanceUsed: uint 
+userID: uint 
+publicKey: bits 
+transactions: TransactionBatch[] 
*/