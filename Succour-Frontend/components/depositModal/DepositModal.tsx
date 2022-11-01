import { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './depositmodal.module.scss'
import walletIcon from '../../assets/wallet-2.svg'
import Image from 'next/image'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import Succour_abi from "../../abi/abi.json"
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'
import { Hash } from 'crypto'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface IProps {
     showDepositModal: any;
     setShowDepositModal: any;
}

const DepositModal = ({ showDepositModal, setShowDepositModal } : IProps) => {

  const SuccourAddress = "0x12F57C67FDd16109B549F0B40579694fE12bf9Fd"
  const [depositamount, setDepositamount] = useState("");

  const { address } = useAccount();

  const {
    data: depositData,
    write: depositWrite,
    isLoading: depositLoading
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'depositIntoDAO',
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
    },
    onError(data){
      console.log(data)
      // add toastify; input: Unable to deposit
    }
  })

  const handleSubmit = (e:any) => {
    e.preventDefault();

    depositWrite();
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
                          disabled={depositLoading || depositLoaderWait}
                          onClick={handleSubmit}
                          >
                            {(depositLoading || depositLoaderWait) ? "Loading..." : "Deposit"}
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