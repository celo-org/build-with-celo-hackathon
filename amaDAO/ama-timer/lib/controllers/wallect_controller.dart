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
    await walletConnectHelper.initSession(context, chainId: 42220);
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
  Future<String> sendToken(String toAddress, String amount) async {
    final txBytes = await sendTransaction(toAddress, amount);
    return txBytes;
  }

  Future<String> sendTransaction(String toAddress, String amount) async {
    final transaction = Transaction(
      to: EthereumAddress.fromHex(toAddress),
      from: EthereumAddress.fromHex(publicWalletAddress!),
      value: EtherAmount.fromUnitAndValue(
        EtherUnit.wei,
        BigInt.from(double.parse(amount) * pow(10, 18)),
      ),
    );
    Credentials cred = walletConnectHelper.getEthereumCredentials();

    final txBytes = await web3client.sendTransaction(cred, transaction);
    return txBytes;
  }
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


}
