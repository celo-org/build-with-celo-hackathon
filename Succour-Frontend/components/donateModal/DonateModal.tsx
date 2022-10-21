import { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './donatemodal.module.scss'
import walletIcon from '../../assets/wallet-2.svg'
import Image from 'next/image'

interface IProps {
     showDonateModal: any;
     setShowDonateModal: any;
}

const DonateModal = ({ showDonateModal, setShowDonateModal } : IProps) => {

       const modalRef = useRef<any | any>();
      
      const animation = useSpring({
        config: {
          duration: 300
        }, 
        opacity: showDonateModal ? 1 : 0,
        transform: showDonateModal ? `translateY(0%)` : `translateY(100%)`
      })

      const closeModal = (e :any) => {
         if(modalRef.current === e.target) {
          setShowDonateModal(false)
         }
      }

      const keyPress = useCallback((e :any) => {
        if(e.key === 'Escape' && showDonateModal) {
          setShowDonateModal(false)
        }
      }, [setShowDonateModal, showDonateModal])

      useEffect(() => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
      }, [keyPress])

     return (
          <>
          {showDonateModal ? ( 
          <div className={styles.donate} ref={modalRef} onClick={closeModal}>
               {/* animating the whole container properties*/}
                <animated.div style={animation}>
               <div className={styles.wrapper} showDonateModal={showDonateModal}>
                     <div className={styles.closeButton} onClick={() => setShowDonateModal((prev : any) => !prev)}></div>
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
                        
                         <button className={styles.join_btn}>Donate</button>
                     </div>

                    </div>                  
               </div>
               </animated.div>
          </div>
            ): null}
          </>
     )
}

export default DonateModal
