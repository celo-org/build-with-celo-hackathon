import { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './donate.module.scss'
import walletIcon from '../../assets/wallet-2.svg'
import Image from 'next/image'

interface IProps {
     showModal: any;
     setShowModal: any;
}

const DonateModal = ({ showModal, setShowModal } : IProps) => {

       const modalRef = useRef<any | any>();
      
      const animation = useSpring({
        config: {
          duration: 300
        }, 
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(100%)`
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

     return (
          <>
          {showModal ? ( 
          <div className={styles.donate} ref={modalRef} onClick={closeModal}>
               {/* animating the whole container properties*/}
                <animated.div style={animation}>
               <div className={styles.wrapper} showModal={showModal}>
                     <div className={styles.closeButton} onClick={() => setShowModal((prev : any) => !prev)}></div>
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
                        
                         <button className={styles.join_btn}>Connect Wallet</button>
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
