import { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './alldonors.module.scss'
import walletIcon from '../../assets/wallet-2.svg'
import Image from 'next/image'

interface IProps {
     showModal: any;
     setShowModal: any;
}

const AllDonors = ({ showModal, setShowModal } : IProps) => {

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
                        
                        
                         {/* <button className={styles.join_btn}>Connect Wallet</button> */}
                     </div>

                    </div>                  
               </div>
               </animated.div>
          </div>
            ): null}
          </>
     )
}

export default AllDonors
