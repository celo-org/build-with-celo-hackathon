import { Contract, ethers } from 'ethers'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { FAKE_KEY, NET_PROVIDER } from 'react-native-dotenv'

export const useRun3T = () => {
  const [run3Contract, setRun3Contract] = useState<Contract>()
  const run3TAddress = '0x570b9f03D8Bfb024F0998eb9E8E1B42A97cA3128'
  const abi = [
    'function mintRun3T(address recipient, uint256 amount)',
    'function balanceOf(address owner) view returns (uint256)',
  ]

  useEffect(() => {
    const getRun3TContract = async () => {
      const provider = new CeloProvider(NET_PROVIDER)
      await provider.ready
      const signer = new ethers.Wallet(FAKE_KEY, provider)
      const run3tContract = new ethers.Contract(run3TAddress, abi, signer)

      setRun3Contract(run3tContract)
    }
    getRun3TContract()
  }, [])

  const getRun3TokenBalanceByOwner = async (address: string) => {
    const balance = await run3Contract?.balanceOf(address)
    const formatBalance = Number(ethers.utils.formatEther(balance)).toFixed(2)
    return formatBalance
  }

  const mintRun3Token = async (address: string) => {
    try {
      const provider = new CeloProvider(NET_PROVIDER)
      await provider.ready
      const signer = new CeloWallet(FAKE_KEY, provider)
      const parsedUnits = ethers.utils.parseUnits('100', 18)
      const estimatedGas = await run3Contract?.estimateGas.mintRun3T(address, parsedUnits)
      const mintTxUnsigned = await run3Contract?.populateTransaction.mintRun3T(address, parsedUnits)
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

  return { mintRun3Token, getRun3TokenBalanceByOwner, abi, run3TAddress }
}
