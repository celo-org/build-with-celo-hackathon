import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import styles from './feeds.module.scss'
import Link from 'next/link'
import Footer from '../../components/footer/Footer'
import SearchIcon from '../../assets/search-normal.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Feeds = () => {

    const router = useRouter()
    const { id } = router.query

  return (
     <>
     <Navbar />
    <div className={styles.feeds}>
      <div className={styles.wrapper}>
          <div className={styles.container}>
               <div className={styles.header}>
                    <h1 className={styles.title}>Feeds</h1>
                    <form className={styles.search_bar}>
                      <button type="submit" className={styles.icon}>
                         <Image src={SearchIcon} alt="" />
                      </button>
                     <input type="text" className={styles.search_input} placeholder="Search Feed" name="search">
                    </input>
                    </form>
               </div>
          </div>
          
          <div className={styles.feeds_container}>
            <Link href={`/ProjectPage/${id}`}>
             <div className={styles.feeds_content}>
                <div className={styles.user_info}>
                    <h1 className={styles.name}>John Doe</h1>
                    <p className={styles.address}>0x2F2ed0B34b67006f4F74A402C276D3CbD66f3C67</p>
                </div>

                <div className={styles.status}>
                    <span className={styles.type}>Project</span>
                    <span className={styles.time}>21h ago</span>
                </div>

                <h1 className={styles.problem_title}>Women Violation in Iran</h1>
               <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate egestas tincidunt pharetra ac ornare est cursus. Varius adipiscing lectus consectetur pharetra. Non congue lacus, lacus tellus et leo vulputate adipiscing. Rhoncus magna adipiscing varius mi lacus eu ipsum. Faucibus eu sit integer est. Nisi molestie commodo egestas faucibus orci commodo integer congue. Commodo eu magna enim pulvinar vitae amet quis faucibus id. </p>
               </div>
               </Link>
            </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Feeds