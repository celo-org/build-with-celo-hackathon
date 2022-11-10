import 'package:flutter/services.dart';
import 'package:web3dart/web3dart.dart';

final _contractAbi = ContractAbi.fromJson(
  ''' [{"inputs": [],
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
  ]''',
  'ama_sponsor',
);
class AMA_SponsorEscrow extends GeneratedContract {
  AMA_SponsorEscrow({
    required EthereumAddress address,
    required Web3Client client,
    int? chainId,
  }) : super(
    DeployedContract(
      _contractAbi,
      address,
    ),
    client,
    chainId,
  );

  Future<BigInt> retrieve({BlockNum? atBlock}) async {
    final function = self.abi.functions[0];
    assert(checkSignature(function, '2e64cec1'));
    final params = [];
    final response = await read(
      function,
      params,
      atBlock,
    );
    return (response[0] as BigInt);
  }

  /// The optional [transaction] parameter can be used to override parameters
  /// like the gas price, nonce and max gas. The `data` and `to` fields will be
  /// set by the contract.
  Future<String> store(
      BigInt num, {
        required Credentials credentials,
        Transaction? transaction,
      }) async {
    final function = self.abi.functions[1];
    assert(checkSignature(function, '6057361d'));
    final params = [num];
    return write(
      credentials,
      transaction,
      function,
      params,
    );
  }


  Future<DeployedContract> loadContract() async {
    String abi = await rootBundle.loadString('assets/abi.json');
    // deployed contract address
    String contractAddress = "contractAddress";
    final contract = DeployedContract(ContractAbi.fromJson(abi, 'Election'),
        EthereumAddress.fromHex(contractAddress));
    return contract;
  }

  Future<String> callFunction(String funcname, List<dynamic> args,
      Web3Client ethClient, String privateKey) async {
    EthPrivateKey credentials = EthPrivateKey.fromHex(privateKey);
    DeployedContract contract = await loadContract();
    final ethFunction = contract.function(funcname);
    final result = await ethClient.sendTransaction(
        credentials,
        Transaction.callContract(
          contract: contract,
          function: ethFunction,
          parameters: args,
        ),
        chainId: null,
        fetchChainIdFromNetworkId: true);
    return result;
  }

  Future<String> startElection(int name, Web3Client ethClient) async {

    var response =
    await callFunction('startElection', [BigInt.from(name)], ethClient, "");
    print('Election started successfully');
    return response;
  }
  


  
  

}

