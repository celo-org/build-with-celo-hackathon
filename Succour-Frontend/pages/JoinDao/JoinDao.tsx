import { useState, useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './joindao.module.scss'
import JoinModal from '../../components/joinModal/JoinModal'
import { useRouter } from 'next/router'


interface IProps {
    showModal: any;
    setShowModal: any;
}

const JoinDao = ({ showModal, setShowModal } : IProps) => {

    // @dev - this is for JoinModal function

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const router = useRouter()

    const openJoinModal = () => {
      setShowJoinModal(prev => !prev);
    }

    const handleChange = () => {
    setChecked(!checked);
  };

    const handleClick = (e: any) => {
    e.preventDefault()
      router.push("/");
  }

    const modalRef = useRef<any | any>();

    const animation = useSpring({
      config: {
        duration: 300
      }, 
      opacity: showModal ? 1 : 0,
      transform: showModal ? `translateY(0%)` : `translateY(-100%)`
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
        <div className={styles.join} ref={modalRef} onClick={closeModal}>
              {/* animating the whole container properties*/}
              <animated.div style={animation}>
                {/* @ts-ignore */}
              <div className={styles.wrapper} showModal={showModal}>
                    <div className={styles.closeButton} onClick={() => setShowModal((prev : any) => !prev)}></div>
                  <div className={styles.container}>
                        <div className={styles.join_content}>
                        <h1 className={styles.title}>Join Succour DAO</h1>
                        <p className={styles.desc}>
                            To join the Succour DAO, you need at least 5,000 cUSD balance. It is important to note that these amounts are subject to change as proposals for that will come up sometime in the future.
                        </p>

                          <p className={styles.join_question}>Are you willing to join a non-profit organisation? <span>*</span></p>

                            <div className={styles.checkbox_container}>
                                <input type="checkbox" checked={checked} onChange={handleChange} />
                                  <span className={styles.checkmark}></span>
                                <label >Yes</label>
                            </div>


                            <div className={styles.checkbox_container}>
                                <input type="checkbox" id="check" name="checkbox" onClick={handleClick} />
                                <span className={styles.checkmark}></span>
                                <label htmlFor="check">No</label>
                            </div>

                            <button className={styles.join_btn} onClick={openJoinModal}>Continue</button>
                    </div>

                  </div>
              </div>
              </animated.div>
              {/* JoinModal component is here */}
              <JoinModal showJoinModal={showJoinModal} setShowJoinModal={setShowJoinModal} />
        </div>
          ): null}
        </>
    )
}

export default JoinDao
