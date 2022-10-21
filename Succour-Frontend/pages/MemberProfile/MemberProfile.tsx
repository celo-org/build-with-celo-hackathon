import React from 'react'
import styles from './memberprofile.module.scss'
import SearchIcon from '../../assets/search-normal.svg'
import Image from 'next/image'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const MemberProfile = () => {
     return (
          <>
          <Navbar />
          <div className={styles.memberprofile}>
               <div className={styles.wrapper}>
                     <div className={styles.container}>
                  <div className={styles.header}>
                    <h1 className={styles.title}>DAO Members</h1>
                    <form className={styles.search_bar}>
                      <button type="submit" className={styles.icon}>
                         <Image src={SearchIcon} alt="" />
                      </button>
                     <input type="text" className={styles.search_input} placeholder="Search DAO Members" name="search">
                    </input>
                    </form>
               </div>

               <div className={styles.card_body}>
                    <div className={styles.table_responsive}>
                         <table>
                             <thead>
                               <tr>
                                   <td>Name</td>
                                    <td>Member Address</td>
                                     <td>Balance</td>
                                      <td>Voting Power</td>
                                       <td>Percentage of DAO</td>
                               </tr>
                              </thead> 
                         
                          <tbody>
                              <tr className={styles.tr}>
                                   <td className={styles.td}> <span>#001</span>{" "}John Doe</td>
                                     <td className={styles.td}>dnjhndiuropwo096069</td>
                                       <td className={styles.td}>1.5000ETH</td>
                                         <td className={styles.td}>0.785</td>
                                           <td className={styles.td}>0.15</td>
                              </tr>
                          </tbody>

                           <tbody>
                              <tr className={styles.tr}>
                                   <td className={styles.td}> <span>#002</span>{" "}John Doe</td>
                                     <td className={styles.td}>dnjhndiuropwo096069</td>
                                       <td className={styles.td}>1.5000ETH</td>
                                         <td className={styles.td}>0.785</td>
                                           <td className={styles.td}>0.15</td>
                              </tr>
                          </tbody>


                           <tbody>
                              <tr className={styles.tr}>
                                   <td className={styles.td}> <span>#003</span>{" "}John Doe</td>
                                     <td className={styles.td}>dnjhndiuropwo096069</td>
                                       <td className={styles.td}>1.5000ETH</td>
                                         <td className={styles.td}>0.785</td>
                                           <td className={styles.td}>0.15</td>
                              </tr>
                          </tbody>

                          
                           <tbody>
                              <tr className={styles.tr}>
                                   <td className={styles.td}> <span>#004</span>{" "}John Doe</td>
                                     <td className={styles.td}>dnjhndiuropwo096069</td>
                                       <td className={styles.td}>1.5000ETH</td>
                                         <td className={styles.td}>0.785</td>
                                           <td className={styles.td}>0.15</td>
                              </tr>
                          </tbody>
                         
                         </table>
                    </div>
               </div>
          </div>
          
               </div>
          </div>
          <Footer />
          </>
     )
}

export default MemberProfile
