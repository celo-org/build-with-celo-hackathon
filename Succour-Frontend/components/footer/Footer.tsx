import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import DiscordIcon from '../../assets/discord_line.svg'
import DiscordWhiteIcon from '../../assets/discord_line_white.svg'
import LinkdedInIcon from '../../assets/linkedin_line.svg'
import LinkededInWhiteIcon from '../../assets/linkedin_line _white.svg'

const Footer = () => {
     return (
          <div className={styles.footer}>
               <div className={styles.wrapper}>
                    <div className={styles.container}>
                         <div className={styles.footer_menu}>
                              <div className={styles.footer_title}>
                                   Stay connected on future releases and events
                              </div>
                              <button className={styles.button}>Coming Soon</button>
                         </div>
                     <div className={styles.footer_social}>

                          <Link href="#">
                           <div className={styles.social_item}>
                            <Image src={DiscordIcon} alt="Discord" />
                          </div>
                          </Link> 

                            <Link href="#">
                           <div className={styles.social_item}>
                          <Image src={LinkdedInIcon} alt="Discord" />
                          </div>
                          </Link> 

                         <Link href="#">
                           <div className={styles.social_item}>
                          <Image src={DiscordWhiteIcon} alt="Discord" />
                          </div>
                          </Link> 

                            <Link href="#">
                           <div className={styles.social_item}>
                          <Image src={LinkededInWhiteIcon} alt="Discord" />
                          </div>
                          </Link> 
                        </div>

                        <div className={styles.footer_link}>
                           <div className={styles.title}>Quick Links</div>
                            <div className={styles.links}>
                           <Link href="/"><span className={styles.link}>Home</span></Link>
                           <Link href="#aboutus"><span className={styles.link}>About</span></Link>
                           <Link href="/dao"><span className={styles.link}>DAO</span></Link>
                           <Link href="/Crowdfunding"><span className={styles.link}>Funding</span></Link>
                           </div>
                        </div>
                    </div>
               </div>
          </div>
     )
}

export default Footer