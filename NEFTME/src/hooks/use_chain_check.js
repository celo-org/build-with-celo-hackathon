import { useState } from 'react';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Constants from 'expo-constants';
import Web3 from 'web3';

const configs = Constants.manifest.extra;

const useChainCheck = () => {
  const connector = useWalletConnect();
  const [currentChainId, setCurrentChainId] = useState(connector?.chainId);

  const provider = new WalletConnectProvider({
    rpc: {
      [configs.chainId]: configs.rpcUrl,
    },
    connector,
    qrcode: false,
  });

  async function changeToAlfajores() {
    await provider.enable();

    const web3 = new Web3(provider);
    try {
      provider.on('chainChanged', async (chainId) => {
        connector.updateSession({
          chainId,
          accounts: connector.accounts[0],
        });
        setCurrentChainId(chainId);
      });

      await web3.currentProvider.send({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(configs.chainId) }],
        from: connector.accounts[0],
      });
    } catch (switchError) {
      // Error code for when chain is not found
      if (switchError.code === 4902) {
        try {
          await web3.currentProvider.send({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: web3.utils.toHex(configs.chainId),
                chainName: [configs.chainName],
                rpcUrls: [configs.rpcUrl],
              },
            ],
            from: connector.accounts[0],
          });
        } catch (addError) {
        // handle "add" error
        }
      }
    }
  }

  async function addNEFTtoWallet() {
    await provider.enable();

    const web3 = new Web3(provider);
    try {
      await web3.currentProvider.send({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: Constants.manifest.extra.neftmeErc20NEFTAddress,
            symbol: 'NEFT',
            decimals: 18,
            image: Constants.manifest.extra.neftTokenImageUrl,
          },
        },
      });
    } catch (err) {
    // LOG Errors
    }
  }

  return { changeToAlfajores, currentChainId, addNEFTtoWallet };
};

export default useChainCheck;
