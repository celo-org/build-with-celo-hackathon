import React from 'react'
import Link from 'next/link'
import styles from './projects.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import ProjectsDetail from '../../components/projects/Projects'

const Projects = () => {
<<<<<<< HEAD
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
                         <b>Paul Allen:</b> “You look at things you enjoy in your life, but much more important is what you can do to make the world a better place.”
                        </p>
                        <p className={styles.projects_desc}>We at Succour believe that by providing food, healthcare, education, warmth, and other resources to as many as are in need of them, we will be doing a whole lot to make the world a better place.
                          Hence, we urge you to support us by contributing to projects put forward to help people around the world.</p>
                        <Link href="/Propose/Propose">
                        <button className={styles.btn}>Propose a project</button>
                       </Link>
                    </div> 
                    </div>
=======
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
>>>>>>> d32647a491f8e9a2b7f3ba4c8a15252d7da31dcf
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