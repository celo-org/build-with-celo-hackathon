const express = require("express");
const Quote = require('inspirational-quotes');
const app = express();
const ethers = require('ethers');
const crypto = require('crypto');
const buffer = require('buffer');

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

let addr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92265';
const provider = new ethers.providers.JsonRpcProvider();

async function verifyMessage(message, address, signature){
  try {
    const signerAddr = ethers.utils.verifyMessage(message, signature);
    //console.log(signerAddr);
    //console.log(address);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

let key;

function verify(data, puKeyPem, hexSign){
  var verifier = crypto.createVerify('sha1');

  var enc = new TextEncoder('UTF-8'),
  digest = enc.encode(data);
      
  verifier.update(digest);
  verifier.end();

  return verifier.verify(puKeyPem, hexSign, 'hex');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.post("/openChannel", async function(req, res) {
  var msg = req.body.message;
  //console.log(req.body);
  if(await verifyMessage(msg, addr, req.body.ETHSig)){
    //key = msg.publicKey;

    res.send({
      message: 'channel opened',
    });
  }else{
    res.send({
      message: 'invalid signature',
    });
  }
  
});

app.post("/addTransactionBatch", function(req, res) {
  var body = req.body;

  if(verify(body.data, key, body.signature)){
    res.send({
      message: 'accepted',
    });
  }else{
    res.send({
      message: 'rejected: invalid signature',
    });
  }
});

let port = process.env.PORT;

if(port == null || port == "") {
 port = 5000;
}

app.listen(port, function() {
 console.log("server started");
});