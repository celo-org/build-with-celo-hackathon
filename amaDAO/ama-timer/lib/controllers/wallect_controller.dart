import 'dart:math';

import 'package:eip55/eip55.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:web3dart/web3dart.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../model/app_info.dart';
import '../utils/constants.dart';
import '../utils/wallet_connect_helper.dart';

class WalletController extends ChangeNotifier {
  bool balRefresh = false;
  int bottomNavbarIndex = 0;

  EtherAmount bal = EtherAmount.fromUnitAndValue(EtherUnit.wei, 0);

  final WalletConnectHelper walletConnectHelper = WalletConnectHelper(
    bridge: GlobalConstants.bridge,
    appInfo: AppInfo(
      name: GlobalConstants.name,
      description: GlobalConstants.name,
      url: GlobalConstants.url,
    ),
  );

  bool isConnectWallet = false;
  String? publicWalletAddress;
  init() {

    SharedPreferences.getInstance().then((value)  {
      publicWalletAddress = value.getString('address');
      isConnectWallet = value.getBool('connected')==true;
      if(isConnectWallet){
        walletConnectHelper.getWalletConnect();
      }
    });

  }

  late Web3Client web3client;
  //late StreamChicken2Contract contract;



  void connectWallet(context) async {
    print("connect to Wallet");

    isConnectWallet =
    await walletConnectHelper.initSession(context, chainId: GlobalConstants.testnetChainId);
    print(isConnectWallet);
    if (isConnectWallet) {
      publicWalletAddress = walletConnectHelper
          .getEthereumCredentials()
          .getEthereumAddress()
          .toString();

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('address', publicWalletAddress!);
      await prefs.setBool('connected', true);
      walletConnectHelper.getEthereumCredentials().provider;


      // publicWalletAddress = toEIP55Address(publicWalletAddress!);

      // Init web3client
      initWeb3Client();

      // get Balance
      await getBalance();

      // Init contract
      //initContract();

      // Update ui
      notifyListeners();
    }
  }

  void updateBottomNavbarIndex(int value) {
    bottomNavbarIndex = value;
    notifyListeners();
  }

  // Disconnet wallet
  void disconnectWallet() {
    walletConnectHelper.dispose();
    isConnectWallet = false;
    publicWalletAddress = null;
    bottomNavbarIndex = 0;
    notifyListeners();
  }

  void initWeb3Client() {
    web3client = Web3Client(GlobalConstants.apiUrl, Client());
  }

  Future getBalance() async {
    var address =
    await walletConnectHelper.getEthereumCredentials().extractAddress();
    bal = await web3client.getBalance(address);
    notifyListeners();
  }

  // Send token
  void makeContract() async {
    var val = BigInt.parse("200");

    var contractAddress = publicWalletAddress;

    var cred = walletConnectHelper.getEthereumCredentials();  //Fails here (need to cast?)
    // var contractAbi = Storage(address: EthereumAddress.fromHex(contractAddress), client: web3client);
    // await contractAbi.store(val, credentials: cred );
    //
    // var valRet = await contractAbi.retrieve();
    // print(valRet);
  }



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
    final cred = walletConnectHelper.getEthereumCredentials();
    // final privateKey  = EthPrivateKey.fromHex("he");
    final contract = await loadContract();
    final function = contract.function("userFaucet");
    final result = await web3client.callRaw(
      // sender: cred.getEthereumAddress(),
      contract:contract.address,
      data:function.encodeCall([
        BigInt.from(id),BigInt.from(seeds),
      ]),
    );

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
  Future<dynamic> userFaucetFunction(int id,int seeds) async  {
    final contract = await loadContract();
    final function = contract.function('userFaucet');
    final transaction = Transaction.callContract(
        contract: contract,
        function: function,
        parameters: [
          BigInt.from(id),BigInt.from(seeds),
        ]);
    final cred = walletConnectHelper.getEthereumCredentials();

    return web3client.sendTransaction(cred, transaction);
  }


}
