import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import BigNumber from 'bignumber.js'
import toast, { Toaster } from 'react-hot-toast'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'
import RingLoader from "react-spinners/RingLoader";

const Donate = ({ campaignId }) => {

    const [allowPay, setAllowPay] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formInput, updateFormInput] = useState({
        amount: 0
    });

    useEffect(() => {
        checkAllowance()
    }, [allowPay])

    const formatBigNumber = (bn) => {
        const divideBy = new BigNumber('10').pow(new BigNumber(18))
        const converted = new BigNumber(bn.toString())
        const divided = converted.div(divideBy)
        return divided.toFixed(0, BigNumber.ROUND_DOWN)
    }

    const checkAllowance = async () => {
        // opens up metamask extension and connects Web2 to Web3
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        //create provider
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        const myAddress = await signer.getAddress()
        const tokenContract = new ethers.Contract(getConfigByChain(network.chainId)[0].cUSDAddress, GrowAChild.abi, signer)
        //use await function for handling promise
        const tx = await tokenContract.allowance(
            myAddress,
            getConfigByChain(network.chainId)[0].contractProxyAddress
        )
        console.info({ tx })
        formatBigNumber(tx) != '0' ? setAllowPay(true) : setAllowPay(false)

    }

    const approve = async () => {
        setLoading(true)
        await window.ethereum.request({ method: 'eth_requestAccounts' }) // opens up metamask extension and connects Web2 to Web3
        const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
        const network = await provider.getNetwork()
        const signer = provider.getSigner() // get signer
        const tokenContract = new ethers.Contract(getConfigByChain(network.chainId)[0].cUSDAddress, GrowAChild.abi, signer)
        const txApproval = await tokenContract.approve(
            getConfigByChain((await network).chainId)[0].contractProxyAddress,
            '115792089237316195423570985008687907853269984665640564039457584007913129639935'
        )
        toast.success('Approval in process... Please Wait', { icon: '👏' })
        //tx.hash is available only when writing transaction not reading
        const receiptOfApproval = await provider.waitForTransaction(
            txApproval.hash,
            1,
            150000
        ).then(() => {
            toast.success(`Approval Granted.`)
            toast.success(`Start Donating Now.`)
            setAllowPay(true)
            setLoading(false)
        })

    }

    const pay = async () => {
        if (formInput.amount === 0) {
            toast.error("Donation cannot be 0")
        } else {
            setLoading(true)
            try {
                await (window).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
                const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
                const network = await provider.getNetwork()
                const signer = provider.getSigner()
                const gacContract = new ethers.Contract(
                    getConfigByChain(network.chainId)[0].contractProxyAddress,
                    GrowAChild.abi,
                    signer
                )
                const token = getConfigByChain(network.chainId)[0].cUSDAddress
                const tx = await gacContract.deposit(Number(campaignId), ethers.utils.parseUnits(formInput.amount.toString(), 'ether'), token)
                toast('Payment in progress !!', { icon: '👏' })
                const receipt = await provider
                    .waitForTransaction(tx.hash, 1, 150000)
                    .then(() => {
                        toast.success(`Donated Successfully !!`)
                        setLoading(false)
                    })
            } catch (e) {
                toast.error('Transaction Cancelled !!')
                setLoading(false)
            }
        }
    }
    return (
        <div>
            <Toaster position='top-center' reverseOrder={false} />

            {allowPay ? (
                <>
                    Donate Now $(USD): <input onChange={(e) =>
                        updateFormInput((formInput) => ({
                            ...formInput,
                            amount: Number(e.target.value),
                        }))
                    } type="number" class="form-control" placeholder="Amount in USD $" required />
                    {loading ? (
                        <RingLoader color='#000000' loading={loading} size={50} />
                    ) : (
                        <button class="btn btn-tertiary py-2 mt-2" onClick={pay}>
                            Donate
                        </button>)}
                </>
            ) : (<button class="btn btn-white py-2 mt-2" onClick={approve}>
                Start Donating
            </button>)
            }




        </div >
    )
}
export default Donate

