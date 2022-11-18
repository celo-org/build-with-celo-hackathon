# Installation
Clone the repo in your local instnace.

## Requirements
[Setup](https://reactnative.dev/docs/environment-setup) the react-native environment. 
Follow React-Native CLI quickstart

***Developed on:*** MacOS/ Windows

***Target OS:*** Android

***Dependencies:***
- Node 
- Watchman 
- the React Native command line interface
- JDK 
- Android Studio


## Initialise the app
- Navigate to the folder: ` cd app `

- Install All dependencies: ` yarn install `

- Connect with you AVD

- Initialise the app ` yarn android `



## Debug

**WalletConnect v1 (compatible with valora)**

> Comment the code snippet as shown below if your dapp(Equistart) is not able to connect with your crypto wallet(alfaores).



Go to node_modules/@walletconnect/react-native-dapp/dist/providers/WalletConnectProvider.js and comment the code snippet as shown below:

```  
if (Platform.OS === 'android') {

            const canOpenURL = await Linking.canOpenURL(uri);
            
            // if (!canOpenURL) {
            
            //     Linking.openURL('https://walletconnect.org/wallets');
            
            //     throw new Error('No wallets found.');
            
            // }
            await Linking.openURL(uri);
} 
```


## Technologies Adopted

1. [ReactNative CLI](https://reactnative.dev/)
2. [Web3.js](https://web3js.readthedocs.io/en/v1.8.0/getting-started.html#adding-web3)
3. [celo/contractkit](https://docs.celo.org/developer/contractkit)
4. [Alfajores Wallet](https://play.google.com/store/apps/details?id=org.celo.mobile.alfajores&hl=en_IN&gl=US)
5. [Alfajores Testnet](https://alfajores.celoscan.io/)
6. [Wallet Connect v1](https://docs.walletconnect.com/1.0/)



