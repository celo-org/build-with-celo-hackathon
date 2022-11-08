import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
// import styleLeft from '../assets/left-style.svg'
// import styleRight from '../assets/right-style.svg'
import Logo from '../assets/Succour.svg'
import Preloader from '../components/Preloader'
import {motion} from 'framer-motion'

const Home: NextPage = () => {
return (
  <>
  <section className={styles.hero}>
    {/* <>
      <Preloader />
    </> */}
    <div className={styles.wrapper}>
      <div className={styles.netvector_left}></div>
    <div className={styles.circle_left}></div>
      <>
      <Preloader />
    </>
      <div className={styles.container}>
        
      <div className={styles.banner__container}>
      <motion.div 
        animate={{ x: [60, 150, 0], opacity: 1, scale: 1 }}
              transition={{
                  duration: 2,
                  delay: 0.2,
                  ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              // whileHover={{ scale: 1.2 }} 
        className={styles.banner_logo}>
        <Image src={Logo} alt="" />
      </motion.div>

        <div 
        className={styles.banner_title}>
          Succour DAO is an organization founded by people with desire to assist in resolving urgent global concerns.
        </div>

        <p className={styles.banner_desc}>
          Succour DAO aspires to be among the top blockchain-based, charitable organizations. Blockchain technology offers a decentralized and secure platform that may be utilized for a variety of things.
          One of the innovations of blockchain is DAOs, which gave rise to Succour DAO.
        </p>

      <div className={styles.banner_links}>
        <Link href="/dao">
        <button className={styles.dao_btn}>DAO</button>
        </Link>

          <Link href="/Crowdfunding">
              <button className={styles.crowdfunding_btn}>Crowd funding</button>
          </Link> 
      </div>
                
      </div>

    </div>

      <div className={styles.netvector_right}></div>      
      <div className={styles.circle_right}></div>
      </div>

    </section>
    </>
  )
}

export default Home
