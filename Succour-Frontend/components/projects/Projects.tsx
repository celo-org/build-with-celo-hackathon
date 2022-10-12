import React from 'react'
import Link from 'next/link'
import styles from './project.module.scss'
import Image from 'next/image'

const Projects = () => {
     return (
          <section className={styles.project}>
               <div className={styles.wrapper}>
                    <div className={styles.container}>
                    <div className={styles.project_container}>
                             <div className={styles.project_title}>Projects</div>
                         <div className={styles.right}>
                            <Link href="/">
                              <button className={styles.controller_link}>View all projects</button>
                             </Link>
                         </div>
                         
                       <div className={styles.project_grid}>
                         <div className={styles.project_item}>
                            <div className={styles.project_img}>
                              <Image src="" />
                            </div> 
                            <div className={styles.project_text}>
                              <div className={styles.project_time}>20 days 8hrs left!</div>
                              <div className={styles.project_titled}>Flooding disaster in Syria</div>
                              <div className={styles.project_desc}>
                               Lorem ipsum dolor sit amet, 
                               consectetur adipiscing elit. At scelerisque rhoncus elit vel imperdiet. Est, senectus ac et porttitor. 
                              </div>
                              <div className={styles.project_voteTiming}>
                                 <div className={styles.left_item}>
                                   <h2 className={styles.lowest}>Lowest</h2>
                                   <h1 className={styles.ether}>0.05ETH</h1>
                                 </div>
                                 <div className={styles.right_item}>
                                  <button className={styles.button}>Vote Now</button>
                                 </div>
                              </div>
                           </div> 
                         </div>
                     </div>


                    </div>
                    </div>
               </div>
          </section>
     )
}

export default Projects
