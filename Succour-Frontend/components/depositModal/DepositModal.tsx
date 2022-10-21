import { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './depositmodal.module.scss'
import walletIcon from '../../assets/wallet-2.svg'
import Image from 'next/image'

interface IProps {
     showDepositModal: any;
     setShowDepositModal: any;
}

const DepositModal = ({ showDepositModal, setShowDepositModal } : IProps) => {

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
               <div className={styles.wrapper} showDepositModal={showDepositModal}>
                     <div className={styles.closeButton} onClick={() => setShowDepositModal((prev : any) => !prev)}></div>
                    <div className={styles.container}>
                         <div className={styles.donate_content}>
                         <h1 className={styles.title}>How much would you like to donate?</h1>
                         
                         <div className={styles.donate_input}>
                              <div className={styles.wallet_icon}>
                               <Image src={walletIcon} alt="" />
                              </div>
                              <input type="number"></input>
                               <select name="choice">
                              <option value="BTC">BTC</option>
                              <option value="ETH">ETH</option>
                              <option value="USDC">USDC</option>
                              <option value="cUSD" selected>cUSD</option>
                            </select> 
                         </div>
                        
                         <button className={styles.deposit_btn}>Deposit</button>
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
