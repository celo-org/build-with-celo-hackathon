import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './campaign.module.scss'
import CircleIllustration from '../../assets/circle-bg.png'

const Campaign = () => {
     return (
          <div className={styles.campaign}>
               <div className={styles.wrapper}>
                    <div className={styles.container}>
                         <div className={styles.campaign__container}>
                          <div className={styles.campaign_content}>
                            <div className={styles.content}>
                               <div className={styles.title}>Contribute to pressing <span>global</span> issues</div>      
                                <Link href="/Projects/Projects"><button className={styles.button}>Contribute</button></Link>
                              </div>

                              <div className={styles.content_img}></div>
                          </div>

                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Campaign
