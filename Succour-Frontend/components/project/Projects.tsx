import React from 'react'
import Link from 'next/link'
import styles from './project.module.scss'
import Image from 'next/image'
import { data } from './data'

const Projects = () => {
     return (
          <section className={styles.project}>
               <div className={styles.wrapper}>
                    <div className={styles.container}>
                    <div className={styles.project_container}>
                             <div className={styles.project_header}>
                              <span className={styles.title}>Projects</span>
                              <div className={styles.totheright}>
                                <Link href="/Projects"><div className={styles.controller_link}>View all projects</div></Link>
                              </div>
                            </div>
                
                       <div className={styles.project_grid}>
                               {
                    data.map(({ id, time, problemTitle, desc, lowest, etherAmount, voteButton }) => {
                       return (
                         <div className={styles.project_item} key={id}>
                            <div className={styles.project_img}>
                              <Image src="" className={styles.img} />
                            </div> 
                            <div className={styles.project_text}>
                              <div className={styles.project_time}>{time}</div>
                              <div className={styles.project_titled}>{problemTitle}</div>
                              <div className={styles.project_desc}>
                              {desc}
                              </div>
                              <div className={styles.project_voteTiming}>
                                 <div className={styles.left_item}>
                                   <h2 className={styles.lowest}>{lowest}</h2>
                                   <h1 className={styles.ether}>{etherAmount}</h1>
                                 </div>
                                 <div className={styles.right_item}>
                                  <button className={styles.button}>{voteButton}</button>
                                 </div>
                              </div>
                           </div> 
                         </div>
                              )
                           })
                         }
                     </div>


                    </div>
                    </div>
               </div>
          </section>
     )
}

export default Projects
