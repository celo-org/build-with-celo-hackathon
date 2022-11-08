import React from 'react'
import styles from './mission.module.scss'
import imgUrl from '../../assets/Netvector.svg'
import Loader2 from '../header/loader2'
import Loader from '../header/loader'

const Mission = () => {
     return (
          <div className={styles.mission}>
              <div className={styles.wrapper}>
               <div className={styles.container}>
                <div className={styles.mission_img}>
                    <div className={styles.image_content}>
                      <Loader2 />
                      <Loader />
                    </div>
                </div>

                <div className={styles.mission_content}>
                 <h1 className={styles.title}>Our <span>Mission & Vision</span>
                 {/* <div className={styles.netvector}></div> */}
                 </h1>                 
                 <p className={styles.desc}>Assisting those in need, lending a helping hand to communities, cities, states, countries, and industry sectors in need is the mission of the decentralized organization Succour. The DAO is made up of charitable people from all over the world.</p>
                 <p className={styles.desc}>Succor DAOs vision is to contribute significantly to the resolution of a major global problem.</p>
                </div>
               </div>
              <div className={styles.netvector_image}>
              </div> 
               </div>
          </div>
     )
}

export default Mission
