import React from 'react'
import styles from './aboutUs.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
     return (
          <section className={styles.about}>
               <div className={styles.wrapper}>
                 <div className={styles.container}>
                    <div className={styles.about__content}>
                      <h1 className={styles.about__title}>Succour <span className={styles.titlebro}>DAO</span> </h1>
                      <span className={styles.about_desc}>Succour DAO is an idea that came to be from individuals in the blockchain world who saw need for a platform set aside for donations to combat some of the problems the world faces today. <span className={styles.descbro}>Succour’s governance is decentralized, which means every member of the DAO has equal right to make proposals, vote, and make contributions.</span> 
                      </span>

                      <div className={styles.about_btn}>
                        <Link href="/">
                         <button className={styles.btn}>Join DAO</button>
                        </Link>
                      </div>
                    </div>

                    <div className={styles.about__image}>
                         <div className={styles.image__container}>
                           
                         </div>

                          <div className={styles.image__container2}>
                           
                         </div>

                          <div className={styles.image__container2}>
                           
                         </div>

                          <div className={styles.image__container}>
                           
                         </div>

                    </div>
                 </div>
               </div>
          </section>
     )
}

export default Header
