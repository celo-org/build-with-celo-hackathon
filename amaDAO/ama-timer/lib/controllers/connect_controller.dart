
import 'package:flutter/cupertino.dart';
import 'package:flutter_web3/flutter_web3.dart';

import 'package:web3dart/web3dart.dart';
class ConnectController extends ChangeNotifier{
  static const chainId = 4;

  String currentAddress = "";
  int currentChain = -1;
  bool get isEnabled => ethereum !=null;
  bool get isInOperatingChain =>  chainId==currentChain;
  bool get isConnected => isEnabled &&  currentAddress.isNotEmpty;

  Future<void> connect() async{
    if(isEnabled){
      final acess = await ethereum!.requestAccount();
      print(acess);
      if(acess.isNotEmpty) {
        currentAddress = acess.first;
        print(currentAddress);
      }
      currentChain = await ethereum!.getChainId();
      notifyListeners();
    }
  }

  clear(){
    currentAddress="";
    currentChain = -1;
    notifyListeners();
    // update();
  }
  init(){
    // var prefs = SharedAppData()

  if(isEnabled){
    ethereum!.onAccountsChanged((accounts) {
      clear();
    });
    ethereum!.onChainChanged((accounts) {
      clear();
    });

  }
  }


  static const address = '';
  static const deadAddress = '';
  Contract? contract;
  String abi ='''[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ama_addr",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "cancel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "settlementTime",
        "type": "uint256"
      }
    ],
    "name": "create",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "escrowSponsor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "escrows",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "sponsor",
        "type": "address"
      },
      {
        "internalType": "address payable",
        "name": "partner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "amaApproved",
        "type": "bool"
      },
      {
        "internalType": "enum AMA_SponsorEscrow.Asset",
        "name": "currency",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "funds",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "fees",
        "type": "uint256"
      },
      {
        "internalType": "enum AMA_SponsorEscrow.State",
        "name": "escrowState",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "settlementTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "lockTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nEscrow",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "reject",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "releaseFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "setComplete",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "setTitle",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "requestValue",
        "type": "uint256"
      }
    ],
    "name": "userFaucet",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]''';

  Future<DeployedContract> loadContract() async {
    // String abi = await rootBundle.loadString('assets/ama.abi.json');
    // contract address
    String contractAddress = "0x60fABf09F96edCFA8D0E359cFc835181294A8817";
    final contract = DeployedContract(ContractAbi.fromJson(abi, 'AMA_SponsorEscrow'),
        EthereumAddress.fromHex(contractAddress));
    return contract;
  }

  Future<dynamic> userFaucet(int id, int seeds) async {

    ethereum?.request("method",[]);
    "params: ["
        "{ from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',"
        "to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',"
        "gas: '0x76c0', "
        "gasPrice: '0x9184e72a000',"
        "value: '0x9184e72a',"
        "data:'0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',},]";
    // final cred = walletConnectHelper.getEthereumCredentials();
    // final privateKey  = EthPrivateKey.fromHex("he");
    final contract = await loadContract();
    final function = contract.function("userFaucet");
    final result = "";
    // final result = await web3client.callRaw(
    //   // sender: cred.getEthereumAddress(),
    //   contract:contract.address,
    //   data:function.encodeCall([
    //     BigInt.from(id),BigInt.from(seeds),
    //   ]),
    // );

    print("result from userFaucet: $result");

    // final transaction = Transaction.callContract(contract: contract, function: function, parameters: [BigInt.from(id),BigInt.from(seeds),]);
    //
    // var signed = await web3client.signTransaction(
    //   cred,
    //   transaction,
    //   chainId: chainId,
    //   fetchChainIdFromNetworkId: false,
    // );
    //
    // if (transaction.isEIP1559) {
    //   signed = prependTransactionType(0x02, signed);
    // }
    // final responce = web3client.sendRawTransaction(signed);


    // final result = await  web3client.sendTransaction(cred,
    //   Transaction.callContract(
    //       contract: contract, function: function, parameters: [
    //         BigInt.from(id),BigInt.from(seeds),
    //   ]),
    //     chainId: null,
    //     fetchChainIdFromNetworkId: true
    // );
    return result;
  }



}