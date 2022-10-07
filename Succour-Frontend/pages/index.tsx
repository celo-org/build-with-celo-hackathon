import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import styleLeft from '../assets/left-style.svg'
import styleRight from '../assets/right-style.svg'
import Logo from '../assets/Succour.png'

const Home: NextPage = () => {
  return (
    <section className={styles.container}>
         {/* <div className={styles.background_style}>
         <div className={styles.netvector1}>
          <Image src={styleLeft} />
         </div>
        
          <div className={styles.netvector2}>
           <Image src={styleRight} />
          </div>
         </div> */}

      
      <div className={styles.wrapper}>
      
      <div className={styles.banner_container}>
        
        <div className={styles.banner_logo}>
         <Image src={Logo} />
        </div>

         <h1 className={styles.banner_title}>
           Succour DAO is an organization founded by people with desire to assist in resolving urgent global concerns.
         </h1>

         <p className={styles.banner_desc}>
           	Succour DAO aspires to be among the top blockchain-based, charitable organizations. Blockchain technology offers a decentralized and secure platform that may be utilized for a variety of things.
            One of the innovations of blockchain is DAOs, which gave rise to Succour DAO.
         </p>
        </div>
      </div>


      <footer className={styles.footer}>
        <div className={styles.footer_contain}>
          <ul className={styles.footer_content}>
          <Link href="/dao">
              <li className={styles.footer_links}>DAO</li>
          </Link>

         <Link href="/funding">
             <li className={styles.footer_links}>Public funding</li>
         </Link>
        </ul>
        </div>
     
         <Link href="/DAO/dao">
          <button className={styles.cta} onClick={()=> {}}>Learn About us</button>
         </Link>
      </footer>

    </section>
  )
}

export default Home
