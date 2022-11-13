import { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useRouter } from 'next/router'
import styles from './withdrawalert.module.scss'
import warmingSVG from '../../assets/rafiki.svg'
import Link from 'next/link'
import Image from 'next/image'
import Succour_abi from "../../abi/abi.json"
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'

interface IProps {
     showModal: any;
     setShowModal: any;
}

const WithdrawAlert = ({ showModal, setShowModal } : IProps) => {
     
       const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"
       const router = useRouter();

       const modalRef = useRef<any | any>();
       const [ cancel, setCancel ] = useState(false);
      
      const animation = useSpring({
        config: {
          duration: 300
        }, 
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(60%)`
      })

      const closeModal = (e :any) => {
         if(modalRef.current === e.target) {
          setShowModal(false)
         }
      }

      const keyPress = useCallback((e :any) => {
        if(e.key === 'Escape' && showModal) {
          setShowModal(false)
        }
      }, [setShowModal, showModal])

      useEffect(() => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
      }, [keyPress])

      const {
        data: requestToWithdrawData,
        write: requestToWithdrawWrite,
        isLoading: requestLoading
    } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: SuccourAddress,
        contractInterface: Succour_abi,
        functionName: 'requestToWithdrawDAO'
    })

    const {isLoading: rtwLoader} = useWaitForTransaction({
        hash: requestToWithdrawData?.hash,
        onSuccess(){
              // add toastify; input: You've Requested for withdrawal
              toast.success('You have Requested for withdrawal', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 8000
              })
        },
        onError(data){
              console.log(data)
              // add toastify; input: Unable to request for withdrawal
                toast.error('Unable to request for withdrawal', 
              { position: toast.POSITION.TOP_CENTER })
        }
    })


    const handleSubmit = (e:any) => {
      e.preventDefault();
      requestToWithdrawWrite();
  }
  const handleCancel = () => {
    router.push('/dao')
  }

    return (
        <>
        <ToastContainer />
        {showModal ? (
        <div className={styles.withdraw} ref={modalRef} onClick={closeModal}>
              {/* animating the whole container properties*/}
              <animated.div style={animation}>
                {/* @ts-ignore */}
              <div className={styles.wrapper} showModal={showModal}>
                    <div className={styles.closeButton} onClick={() => setShowModal((prev : any) => !prev)}></div>
                  <div className={styles.container}>
                        <div className={styles.withdraw_content}>
                        <div className={styles.withdraw_svg}>
                        <Image src={warmingSVG} alt="" width={200} height={200}  />
                        </div>

                        <h1 className={styles.title}>Are you sure you want to request to withdraw?</h1>
                        <p className={styles.desc}>Please note that this takes 14 days to be approved by the DAO</p>

                      <div className={styles.withdraw_btn}>
                        <button
                        className={styles.yes_btn}
                        disabled={requestLoading || rtwLoader}
                        onClick={handleSubmit}
                        >
                        {(requestLoading || rtwLoader) ? "Loading..." : "Yes, request to Withdraw"}
                      </button>
                        {/* <Link href="/profilepage/ProfilePage"> */}
                        {/* <button className={styles.cancel_btn} onClick={handleCancel}>No, Cancel</button> */}
                        {/* </Link> */}
                        <Link href="/profilepage/ProfilePage">
                        <button className={styles.cancel_btn}>No, Cancel</button>
                        </Link>
                      </div>

                    </div>

                  </div>
              </div>
              </animated.div>
        </div>
          ): null}
        </>
    )
}

export default WithdrawAlert
