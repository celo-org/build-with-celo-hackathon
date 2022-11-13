import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './giving.module.scss'
import CircleIllustration from '../../assets/circle-bg.png'

const Giving = () => {
     return (
          <div className={styles.giving}>
               <div className={styles.wrapper}>
                    <div className={styles.container}>
                         <div className={styles.giving__container}>
                          <div className={styles.campaign_content}>
                            <div className={styles.content}>
                               <div className={styles.title}>Giving to social causes just became much easier!</div>      
                                <Link href="/Viewmore/Viewmore"><button className={styles.button}>Find fundraisers</button></Link>
                              </div>

                              <div className={styles.content_img}></div>
                          </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Giving
