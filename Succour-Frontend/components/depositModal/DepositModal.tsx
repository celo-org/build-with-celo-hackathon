import { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './depositmodal.module.scss'
import walletIcon from '../../assets/wallet-2.svg'
import Image from 'next/image'
import { useContractWrite, useWaitForTransaction, useAccount } from 'wagmi'
import Succour_abi from "../../abi/abi.json"
import { ethers } from 'ethers'
import { Hash } from 'crypto'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import ERC20_ABI from "../../abi/ERC20.json"

interface IProps {
    showDepositModal: any;
    setShowDepositModal: any;
}

const DepositModal = ({ showDepositModal, setShowDepositModal } : IProps) => {

  const router = useRouter()

  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"
  const cUSDaddress = "0x4D3742f7d4AE2Ac3619c413E75976A9c7067b70E"

  const [depositamount, setDepositamount] = useState("");

  const { address } = useAccount();

  // Approves ERC20 token to deposit
  const {
    data: approveData,
    write: approvecUSDToken,
    isLoading: approveLoading,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: cUSDaddress,
    contractInterface: ERC20_ABI.abi,
    functionName: 'approve',
    args: [
      SuccourAddress,
      ethers.utils.parseEther(depositamount? depositamount.toString(): "0"),
    ]
  })

  const {isLoading: approveWaitLoader} = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess(){
      depositWrite()
    },
    onError(data){
      console.log(data)
    }

  })




  const {
    data: depositData,
    write: depositWrite,
    isLoading: depositLoading
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'updateDAOMemberBal',
    args: [
      ethers.utils.parseEther(depositamount ? depositamount.toString(): "0")
    ]
  })

  const {
    isLoading: depositLoaderWait
  } = useWaitForTransaction({
    hash: depositData?.hash,
    onSuccess(){
      // add toastify; input: Deposit Successful
        toast.success('Deposit Successful', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 8000
              })
        router.push('/dao')
    },
    onError(data){
      console.log(data)
      // add toastify; input: Unable to deposit
       toast.error('Unable to deposit', 
        { position: toast.POSITION.TOP_CENTER })
    }
  })

  const handleSubmit = (e:any) => {
    e.preventDefault();
    approvecUSDToken();
  }

      const modalRef = useRef<any | any>();

      const animation = useSpring({
        config: {
          duration: 300
        }, 
        opacity: showDepositModal ? 1 : 0,
        transform: showDepositModal ? `translateY(0%)` : `translateY(-100%)`
      })

      const closeModal = (e :any) => {
        if(modalRef.current === e.target) {
          setShowDepositModal(false)
        }
      }

      const keyPress = useCallback((e :any) => {
        if(e.key === 'Escape' && showDepositModal) {
          setShowDepositModal(false)
        }
      }, [setShowDepositModal, showDepositModal])

      useEffect(() => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
      }, [keyPress])

  return (
      <>
      {showDepositModal ? (
      <div className={styles.donate} ref={modalRef} onClick={closeModal}>
            {/* animating the whole container properties*/}
            <animated.div style={animation}>
              {/* @ts-ignore */}
            <div className={styles.wrapper} showDepositModal={showDepositModal}>
                  <div className={styles.closeButton} onClick={() => setShowDepositModal((prev : any) => !prev)}></div>
                <div className={styles.container}>
                      <div className={styles.donate_content}>
                      <h1 className={styles.title}>How much would you like to donate?</h1>

                      <div className={styles.donate_input}>
                          <div className={styles.wallet_icon}>
                            <Image src={walletIcon} alt="" />
                          </div>
                          <input type="number" value={depositamount} onChange={(e)=> setDepositamount(e.target.value)} />
                            <select name="choice">
                          <option value="cUSD">cUSD</option>
                        </select>
                      </div>
                      {
                      address ?

                      <button
                      className={styles.deposit_btn}
                      disabled={depositLoading || depositLoaderWait || approveLoading || approveWaitLoader}
                      onClick={handleSubmit}
                      >
                        {(depositLoading || depositLoaderWait || approveWaitLoader || approveLoading) ? "Loading..." : "Deposit"}
                      </button> :

                      <ConnectButton />

                      }

                  </div>

                </div>
            </div>
            </animated.div>
      </div>
        ): null}
      </>
  )
}

export default DepositModal