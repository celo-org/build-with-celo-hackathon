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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Montes, dolor, ultrices vitae, pharetra, odio nec est. Pharetra sed id dictum ornare augue. Suspendisse pellentesque faucibus sagittis sed egestas quam ac neque etiam. 
                        Consectetur consequat sapien ultrices aliquet semper cursus cursus fusce. 
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
