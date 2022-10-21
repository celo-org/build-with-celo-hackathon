import { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './withdrawalert.module.scss'
import warmingSVG from '../../assets/rafiki.svg'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
     showModal: any;
     setShowModal: any;
}

const WithdrawAlert = ({ showModal, setShowModal } : IProps) => {

       const modalRef = useRef<any | any>();
      
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

     return (
          <>
          {showModal ? ( 
          <div className={styles.withdraw} ref={modalRef} onClick={closeModal}>
               {/* animating the whole container properties*/}
                <animated.div style={animation}>
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
                         <button className={styles.yes_btn}>Yes, request to withdraw</button>
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
