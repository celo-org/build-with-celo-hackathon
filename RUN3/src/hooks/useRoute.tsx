import { BigNumber, Contract, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { FAKE_KEY, NET_PROVIDER } from 'react-native-dotenv'
import routeData from '../../blockchain/artifacts/contracts/Route.sol/Route.json'
import { FormatTypes, Interface } from 'ethers/lib/utils'
import { useWalletProvider } from '../contexts/WalletContext'
import { getRouteById } from '../api/routes/routes'

export const useRoute = () => {
  const [routeContract, setRouteContract] = useState<Contract>()
  const { walletWithProvider } = useWalletProvider()
  const routeAddress = '0x9B839eA9e6bA9C15c48653395355F4b0Dc893bA3'
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

  const getRoutesByUser = async () => {
    try {
      const routeContract = new ethers.Contract(routeAddress, abi, walletWithProvider)
      const routeIds = await routeContract.getUserRouteIds(walletWithProvider.address)
      let routesData = []
      if (routeIds.length) {
        routesData = await Promise.all(
          routeIds.map(async (element: BigNumber) => {
            const routeId = ethers.utils.formatUnits(element, 0)
            const tokenUri = await routeContract.tokenURI(routeId)
            const routeUrlArr = tokenUri.split('/')
            const routeFbId = routeUrlArr.length && routeUrlArr[routeUrlArr.length - 1]
            const routeRes = await getRouteById(routeFbId)
            if (!routeRes) return []
            return routeRes
          })
        )
      }
      return routesData
    } catch (e) {
      console.log('error on getRoutesByUser', e)
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

  return { mintRoute, abi, routeAddress, getRoutesByUser }
}
