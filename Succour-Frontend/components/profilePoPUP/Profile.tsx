import { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './profile.module.scss'
import walletIcon from '../../assets/wallet-1.svg'
import Image from 'next/image'
import Link from 'next/link'

interface IProps {
     showProfileModal: any;
     setShowProfileModal: any;
}

const JoinModal = ({ showProfileModal, setShowProfileModal } : IProps) => {

       const modalRef = useRef<any | any>();
      
      const animation = useSpring({
        config: {
          duration: 300
        }, 
        opacity: showProfileModal ? 1 : 0,
        transform: showProfileModal ? `translateY(0%)` : `translateY(100%)`
      })

      const closeModal = (e :any) => {
         if(modalRef.current === e.target) {
          setShowProfileModal(false)
         }
      }

      const keyPress = useCallback((e :any) => {
        if(e.key === 'Escape' && showProfileModal) {
          setShowProfileModal(false)
        }
      }, [setShowProfileModal, showProfileModal])

      useEffect(() => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
      }, [keyPress])

     return (
          <>
          {showProfileModal ? ( 
          <div className={styles.profile} ref={modalRef} onClick={closeModal}>
               {/* animating the whole container properties*/}
                <animated.div style={animation}>
               <div className={styles.wrapper}  showProfileModal={showProfileModal}>
                     <div className={styles.closeButton} onClick={() => setShowProfileModal((prev : any) => !prev)}></div>
                    <div className={styles.container}>
                         <div className={styles.profile_content}>
                          <Link href="/profilepage/ProfilePage">
                          <h1 className={styles.link}>View your profile</h1>
                          </Link>
                          <span className={styles.border}></span>
                          <Link href="/MemberProfile/MemberProfile">
                          <h1 className={styles.link}>View all members profile</h1>
                          </Link>
                          <span className={styles.border}></span>
                          <Link href="/Projects/Projects">
                          <h1 className={styles.link}>View proposals feed</h1>
                          </Link>
                          <span className={styles.border}></span>
                    </div>

                    </div>
                </div>
                </animated.div>
          </div>
            ): null}
          </>
)
}

export default JoinModal