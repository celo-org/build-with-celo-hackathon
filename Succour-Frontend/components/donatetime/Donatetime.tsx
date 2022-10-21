import {useState} from 'react'
import styles from './donatetime.module.scss'
import DonateModal from '../../components/donateModal/DonateModal'

const Donatetime = () => {

      const [showDonateModal, setShowDonateModal] = useState(false);

     const openModal = () => {
       setShowDonateModal(prev => !prev);
     }

  return (
     <>
    <DonateModal showDonateModal={showDonateModal} setShowDonateModal={setShowDonateModal} />
    <div className={styles.donatetime}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
      <div className={styles.donatetime_container}>
      <div className={styles.amount_info}>
          <div className={styles.amount}>
             <h1>2000 usdc raised<span></span></h1>
            <h1>8000usdc target</h1>
          </div>
       
        <div className={styles.box}>
          <div className={styles.box2}></div>
        </div>
      </div>
     
      <div className={styles.donatetime_content}>
        <div className={styles.donatetime_info}>
          <h3 className={styles.lowest}>Lowest vote</h3>
          <h1 className={styles.ether}>0.05 ETH</h1>
        </div>
      </div>
      <button className={styles.vote_btn} onClick={openModal}>Donate</button>
      </div>
      </div>
      </div>
    </div>
     </>
  )
}

export default Donatetime
