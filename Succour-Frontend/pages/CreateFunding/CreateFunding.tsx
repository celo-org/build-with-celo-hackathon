// import {useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './createfunding.module.scss'
import Navbar from '../../layouts/navbar/Navbar'
import Footer from '../../layouts/footer/Footer'
import documentCloudSvg from '../../assets/document-cloud-2.svg'
import arrowLeftSvg from '../../assets/arrow-left.svg'

const CreateFunding = () => {
     
     return (
          <>
          <Navbar />
           <div className={styles.createfund}>
             <div className={styles.left_arrow}>
                <div className={styles.back_arrow}>
               <Link href="/Crowdfunding/Crowdfunding">
                <div className={styles.arrow}>
                    <Image src={arrowLeftSvg} alt="" />
                </div>
               </Link>
              </div>
              </div>
            
             <div className={styles.wrapper}>
              <div className={styles.top_container}>
               <div className={styles.createfund_container}>
                    <div className={styles.createfund_content}>
                   <form className={styles.createfund_form}>
                     <div className={styles.title}>Create funding request</div>
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
          </div>
          <Footer />
          </>
     )
}

export default CreateFunding
