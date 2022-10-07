import React from 'react'
import Link from 'next/link'
import styles from './project.module.scss'

const Projects = () => {
     return (
          <section className={styles.project}>
               <div className={styles.wrapper}>
                    <div className={styles.container}>
                         <div className={styles.left}>
                             <h1 className={styles.title}>Projects</h1>
                         </div>
                         <div className={styles.right}>
                            <Link href="/">
                              <button className={styles.controller_link}>View all projects</button>
                             </Link>
                         </div>
                    </div>
               </div>
          </section>
     )
}

export default Projects
