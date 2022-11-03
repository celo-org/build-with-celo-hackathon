import React from 'react'
import Link from 'next/link'
import styles from './about.module.scss'

const About = () => {
  return (
   <section className={styles.hero}>
      <div className={styles.circle_left}></div>
      <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.banner__container}>
      
         <h1 className={styles.banner_title}>
          Succour Crowd Funding
         </h1>

         <p className={styles.banner_desc}>
          Succour is all about helping in times of need or crisis. Hence, another major part of Succour is <span>The Succour Fund Me.</span>
          {" "}The Succour Fund Me is a crowd-funding  platform where individuals can request funding upon stating their needs for the fund and amount needed. When a fund request is created, it is automatically open to the public for contributions.
         </p>

        <div className={styles.banner_links}>
          
          <Link href="/CreateFunding/CreateFunding">
          <button className={styles.create_btn}>Create funding request</button>
          </Link>

            <Link href="#fundraiser">
               <button className={styles.see_btn}>
                See all funding
              </button>
            </Link> 
        </div>
                 
        </div>

      </div>
       <div className={styles.circle_right}></div>
       </div>
       
    </section>
  )
}

export default About