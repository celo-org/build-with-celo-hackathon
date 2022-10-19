import {useState} from 'react'
import styles from './projects.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { data } from './data'

const Projects = () => {

     const [visible, setVisible] = useState(6);

     const handleMoreProjectItem = () => {
       setVisible((prevValue) => prevValue + 6);
     }

     return (
           <section className={styles.projects}>
               <div className={styles.wrapper}>
                    <div className={styles.container}>
                    <div className={styles.project_container}>
                             <div className={styles.project_header}>
                              <span className={styles.title}>Projects</span>
                              <div className={styles.totheright}>
                               <div className={styles.controller_left}>All proposals</div>
                               <div className={styles.controller_right}>Approved proposals</div>
                              </div>
                            </div>
                       
                       <Link href="/ProposePage/ProposePage">
                       <div className={styles.project_grid}>
                               {
                    data?.slice(0, visible)?.map(({ id, time, problemTitle, desc, lowest, etherAmount, voteButton }) => {
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
                     </Link>
                      <button onClick={handleMoreProjectItem}
                      className={styles.viewmore_btn}
                      >
                      View more
                    </button>
                    </div>
                    </div>
               </div>
          </section>
     )
}

export default Projects
