import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Constants from 'expo-constants';
import Web3 from 'web3';
import nftABI from '../abi/neftme.json';

const configs = Constants.expoConfig.extra;

const useSmartContract = () => {
  const connector = useWalletConnect();
  const provider = new WalletConnectProvider({
    rpc: {
      [configs.chainId]: configs.rpcUrl,
    },
    connector,
    qrcode: false,
  });

  const getContractMethods = async (contractAddress) => {
    await provider.enable();

    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(
      nftABI,
      contractAddress,
    );

    return contract.methods;
  };

  const getContract = async (contractAddress) => {
    await provider.enable();

    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(
      nftABI,
      contractAddress,
    );

    return contract;
  };

  return { getContractMethods, getContract };
};

export default useSmartContract;
