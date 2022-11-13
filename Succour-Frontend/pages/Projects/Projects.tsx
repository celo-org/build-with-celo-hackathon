import React from 'react'
import Link from 'next/link'
import styles from './projects.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProjectsDetail from '../../components/projects/Projects'

const Projects = () => {
   return (
         <>
            <Navbar />
            <div className={styles.projects}>
               <div className={styles.netvector_left}></div>
               <div className={styles.wrapper}>
                  <div className={styles.top_container}>
                     <div className={styles.projects_content}>
                        <h1 className={styles.projects_title}>Contribute to pressing world issues</h1>
                        <p className={styles.projects_desc}>
                           Paul Allen: “You look at things you enjoy in your life, but much more important is what you can do to make the world a better place.”

                           We at Succour believe that by providing food, healthcare, education, warmth, and other resources to as many as are in need of them, we will be doing a whole lot to make the world a better place.
                           Hence, we urge you to support us by contributing to projects put forward to help people around the world.
                        </p>
                     <Link href="/Propose/Propose">
                     <button className={styles.btn}>Propose a project</button>
                     </Link>
                  </div>
                  </div>
               </div>
               <div className={styles.netvector_right}></div>
            </div>
            <ProjectsDetail />
            <Footer />
         </>
   )
}

export default Projects