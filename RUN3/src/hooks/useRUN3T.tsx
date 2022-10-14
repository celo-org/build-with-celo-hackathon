import { Contract, ethers } from 'ethers'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { FAKE_KEY, NET_PROVIDER } from 'react-native-dotenv'

export const useRun3T = () => {
  const [run3Contract, setRun3Contract] = useState<Contract>()

  useEffect(() => {
    const getRun3TContract = async () => {
      const provider = new CeloProvider(NET_PROVIDER)
      await provider.ready
      const signer = new ethers.Wallet(FAKE_KEY, provider)
      const abi = [
        'function mint(address recipient, uint256 amount)',
        'function balanceOf(address owner) view returns (uint256)',
      ]

      const run3tContract = new ethers.Contract('0x25cD75A13d91AA792b18F593E0a337E23a774bAe', abi, signer)

      setRun3Contract(run3tContract)
    }
    getRun3TContract()
  }, [])

  const getRun3TokenBalance = async (address: string) => {
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
      const estimatedGas = await run3Contract?.estimateGas.mint(address, parsedUnits)
      const mintTxUnsigned = await run3Contract?.populateTransaction.mint(address, parsedUnits)
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

  return { mintRun3Token, getRun3TokenBalance }
}
