import {useState} from 'react'
import Link from 'next/link'
import styles from './relatedprojects.module.scss'
import Image from 'next/image'
import { data } from '../../pages/data'


const RelatedProjects = () => {

     const [visible, setVisible] = useState(3);

     const handleMoreProjectItem = () => {
       setVisible((prevValue) => prevValue + 3);
     }

     return (
          <section className={styles.project}>
               <div className={styles.wrapper}>
                <div className={styles.netvector_right}></div>
                 <div className={styles.circle_right}></div>
                    <div className={styles.container}>
                    <div className={styles.project_container}>
                             <div className={styles.project_header}>
                              <span className={styles.title}>Related Projects</span>
                              {/* <div className={styles.totheright}>
                                <Link href="/Projects/Projects"><div className={styles.controller_link}>View all projects</div></Link>
                              </div> */}
                            </div>
                
                       
                   
                     <div className={styles.project_grid}>
                               {
                    data?.slice(0, visible)?.map(({ id, time, problemTitle, desc, lowest, etherAmount, voteButton }) => {
                       return (
                         <Link href={`/ProjectPage/${id}`} key={id}>
                         <div className={styles.project_item}>
                            <div className={styles.project_img}>
                              <Image src="" alt="" className={styles.img} />
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
                           </Link>
                              )
                           })
                         }
                     </div>
                    
                       <div className={styles.viewmore_center}>
                       <button onClick={handleMoreProjectItem}
                        className={styles.viewmore_btn}
                        >
                        View more
                       </button>
                      </div>
                  
                    </div>
                    </div>
               </div>
          </section>
     )
}

export default RelatedProjects
