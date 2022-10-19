import React from 'react'
import styles from './proposepage.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Image from 'next/image'
import Link from 'next/link'
import arrowLeftSvg from '../../assets/arrow-left.svg'

const PrososePage = () => {
  return (
     <>
     <Navbar />
     <div className={styles.page}>
        <div className={styles.left}>
          <div className={styles.back_arrow}>
              <Link href="/Projects/Projects">
              <div className={styles.arrow}>
                  <Image src={arrowLeftSvg} alt="" />
                </div>
               </Link>
               </div>
        </div>
            
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.page_info}>
            <span>Proposal by</span>
            <p>0x15106aDcb41101434F12D9a666887a1292a397Ec</p>
          </div>

          <div className={styles.status}>
           <span>Project</span>
          </div>
        </div>
      </div>
     </div>
    <Footer />
    </>
  )
}

export default PrososePage
