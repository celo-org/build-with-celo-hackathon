import { Contract, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { FAKE_KEY, NET_PROVIDER } from 'react-native-dotenv'
import routeData from '../../blockchain/artifacts/contracts/Route.sol/Route.json'
import { FormatTypes, Interface } from 'ethers/lib/utils'
import { useWalletProvider } from '../contexts/WalletContext'

export const useRoute = () => {
  const [routeContract, setRouteContract] = useState<Contract>()
  const { walletWithProvider } = useWalletProvider()
  const routeAddress = '0xBB189Dfe7cCE8B4aE48c0f881D2334B877d7A783'
  const abi = routeData.abi
  const fireStoreBase = 'https://firestore.googleapis.com/v1/projects/run3-587b8/databases/(default)/documents/routes'

  useEffect(() => {
    const getWatchContract = async () => {
      const provider = new CeloProvider(NET_PROVIDER)
      await provider.ready
      const signer = new ethers.Wallet(FAKE_KEY, provider)
      const iface = new Interface(abi)
      const watchContract = new ethers.Contract(routeAddress, iface.format(FormatTypes.full), signer)

      setRouteContract(watchContract)
    }
    getWatchContract()
  }, [])

  const getRouteByUser = async () => {
    try {
      const routeContract = new ethers.Contract(routeAddress, abi, walletWithProvider)
      const test = await routeContract.balanceOf(walletWithProvider.address)
      const formatBalance = Number(ethers.utils.formatEther(test))
      console.log('logRoute', formatBalance)
      //       await mintWatch(walletWithProvider.address)
    } catch (e) {
      console.log('error on getWatchdata', e)
    }
  }

  const mintRoute = async (fireBaseId: string) => {
    try {
      const provider = new CeloProvider(NET_PROVIDER)
      await provider.ready
      const signer = new CeloWallet(FAKE_KEY, provider)
      const estimatedGas = await routeContract?.estimateGas.mintRoute(
        walletWithProvider.address,
        `${fireStoreBase}/${fireBaseId}`
      )
      const mintTxUnsigned = await routeContract?.populateTransaction.mintRoute(
        walletWithProvider.address,
        `${fireStoreBase}/${fireBaseId}`
      )
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

  return { mintRoute, abi, routeAddress, getRouteByUser }
}
