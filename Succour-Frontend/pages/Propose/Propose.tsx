import {useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './prospose.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import documentCloudSvg from '../../assets/document-cloud.svg'
import arrowLeftSvg from '../../assets/arrow-left.svg'

const Propose = () => {
     
     return (
          <>
          <Navbar />
           <div className={styles.propose}>
             <div className={styles.left_arrow}>
                <div className={styles.back_arrow}>
               <Link href="/Projects/Projects">
                <div className={styles.arrow}>
                    <Image src={arrowLeftSvg} alt="" />
                </div>
               </Link>
              </div>
              </div>
            
             <div className={styles.wrapper}>
              <div className={styles.top_container}>
               <div className={styles.propose_content}>
                   <h1 className={styles.title}>Propose a project</h1>
                   <form className={styles.propose_form}>
                     {/* <label>Member ID</label>
                     <input id="input" name="input" type="text" /> */}

                      <label>Project title</label>
                     <input id="input" name="input" type="text" />

                     <label>Project links</label>
                     <input id="input" name="input" type="text" />

                      <label>Amount proposed</label>
                      <input id="input" name="input" type="text" />

                      <label>Project description</label>
                     <textarea cols={30} rows={5} ></textarea>
                     <label>Project media</label>
                     <div className={styles.upload_btn_wrapper}>
                         <div className={styles.cloudsvg}>
                              <div className={styles.icon}>
                               <Image src={documentCloudSvg} alt="" />
                              </div>
                                <input type="file" 
                         name="selectfile" 
                         id="selectfile" 
                         className={styles.upload}
                         />
                              <p>Click here to upload an image</p>
                         </div>
                     </div>
                     <button className={styles.form_btn}>Propose Project</button>
                   </form>
               </div>
              </div>
             </div>  
          </div>
          <Footer />
          </>
     )
}

export default Propose
