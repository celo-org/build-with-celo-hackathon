import { Contract, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { FAKE_KEY, NET_PROVIDER } from 'react-native-dotenv'
import WatchAbi from '../../blockchain/artifacts/contracts/Watch.sol/Watch.json'
import { FormatTypes, Interface } from 'ethers/lib/utils'
import { useWalletProvider } from '../contexts/WalletContext'

export const useWatch = () => {
  const [watchContract, setWatchContract] = useState<Contract>()
  const { walletWithProvider } = useWalletProvider()
  const watchAddress = '0xE9640adB185b907942ac0Be57028559725DD1083'
  const abi = WatchAbi.abi
  type Watch = {
    id: number
    name: string
    image: string
  }

  const [watchData, setWatchData] = useState<Watch>()

  useEffect(() => {
    const getWatchContract = async () => {
      const provider = new CeloProvider(NET_PROVIDER)
      await provider.ready
      const signer = new ethers.Wallet(FAKE_KEY, provider)
      const iface = new Interface(abi)
      const watchContract = new ethers.Contract(watchAddress, iface.format(FormatTypes.full), signer)

      setWatchContract(watchContract)
    }
    getWatchContract()
  }, [])

  const getWatchDataByUser = async () => {
    try {
      const watchContract = new ethers.Contract(watchAddress, abi, walletWithProvider)
      const watchData = await watchContract?.getWatchData(walletWithProvider.address)
      const watchId = watchData[0].toNumber()
      if (watchId === 0) {
        await mintWatch(walletWithProvider.address)
      } else {
        setWatchData({
          id: watchId,
          name: watchData[1],
          image: watchData[2],
        })
      }
    } catch (e) {
      console.log('error on getWatchdata', e)
    }
  }

  const mintWatch = async (address: string) => {
    try {
      const provider = new CeloProvider(NET_PROVIDER)
      await provider.ready
      const signer = new CeloWallet(FAKE_KEY, provider)
      const estimatedGas = await watchContract?.estimateGas.mintWatch(address)
      const mintTxUnsigned = await watchContract?.populateTransaction.mintWatch(address)
      if (mintTxUnsigned) {
        mintTxUnsigned.gasLimit = estimatedGas
        mintTxUnsigned.gasPrice = await provider.getGasPrice()
        const mintTxSigned = await signer.signTransaction(mintTxUnsigned)
        const submittedTx = await provider.sendTransaction(mintTxSigned)
        const mintReceipt = await submittedTx.wait()

        if (mintReceipt.status === 0) throw new Error('Mint transaction failed')
      }
    } catch (e) {
      console.log('error', e)
    }
  }

  return { mintWatch, abi, watchAddress, getWatchDataByUser, watchData }
}
