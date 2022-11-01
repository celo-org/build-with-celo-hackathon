import{useState} from 'react'
import styles from './aboutUs.module.scss'
import JoinDao from '../../pages/JoinDao/JoinDao'
import Loader from './loader'
import Loader2 from './loader2'

const Header = () => {

     
   const [showModal, setShowModal] = useState(false);

     const openModal = () => {
       setShowModal(prev => !prev);
     }

     return (
          <>
           <JoinDao showModal={showModal} setShowModal={setShowModal} />
          <section className={styles.about} id="aboutus">
               <div className={styles.wrapper}>
                 <div className={styles.container}>
                    <div className={styles.about_content}>
                      <div className={styles.about__title}>Succour <span>DAO</span></div>
                      <div className={styles.about_desc}>Succour DAO is an idea that came to be from individuals in the blockchain world who saw need for a platform set aside for donations to combat some of the problems the world faces today. <span>Succour’s governance is decentralized, which means every member of the DAO has equal right to make proposals, vote, and make contributions.</span>
                      </div>

                      <div className={styles.about_btn}>
                         <button className={styles.btn} onClick={openModal}>Join DAO</button>
                      </div>
                    </div>

                    <div className={styles.about__image}>
                         <Loader />
                         <Loader2 />
                    </div>

                    </div>
                 </div>
          </section>
          </>
     )
}

export default Header
