import React from 'react'
import styles from './otherproposal.module.scss'
import { data } from './data'
import Link from 'next/link'


const Otherproposal = () => {
  return (
    <div className={styles.otherproposal}>
      <div className={styles.wrapper}>
          <div className={styles.container}>
               <div className={styles.header}>
                <h1 className={styles.title}>Other proposals</h1>
               </div>

               <Link href="/ProjectPage/ProjectPage">
               <div className={styles.otherproposal_content}>
                            {
                    data?.map(({ id, time, title, address, type, problem }) => {
                       return (
                    <div className={styles.otherproposal_item} key={id}>
                    <div className={styles.otherproposal_text}>
                      <h2 className={styles.item_title}>{title}</h2>
                       <p className={styles.item_address}>{address}</p>
                      <h1 className={styles.problem_title}>{problem}</h1>
                    
                    <div className={styles.donation_duration}>
                         <span className={styles.duration_type}>{type}</span>
                         <span className={styles.time}>{time}</span>
                     </div>
                    </div>
                    </div>
                      )
                           })
                         }
               </div>
               </Link>
          </div>
      </div>
    </div>
  )
}

export default Otherproposal
