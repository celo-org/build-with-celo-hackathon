import {useState} from 'react'
import Link from 'next/link'
import styles from './project.module.scss'
import Image from 'next/image'
import { data } from '../../pages/data'
import { useContractRead, useAccount } from 'wagmi'
import Succour_abi from "../../abi/abi.json"
import { Any } from '@react-spring/types'


const Projects = () => {

  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"

  // read proposed project from the contract

  const {data: DAOProposals} = useContractRead({
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'viewAllProposals'
  })


console.log(DAOProposals, "view the contract proposals")

     const [visible, setVisible] = useState(3);

     const handleMoreProjectItem = () => {
       setVisible((prevValue) => prevValue + 3);
     }

     const hexToDecimal = (hex:any) => parseInt(hex, 16);

     return (
          <section className={styles.project}>
               <div className={styles.wrapper}>
                <div className={styles.netvector_right}></div>
                 <div className={styles.circle_right}></div>
                    <div className={styles.container}>
                    <div className={styles.project_container}>
                             <div className={styles.project_header}>
                              <span className={styles.title}>Projects</span>
                              <div className={styles.totheright}>
                                <Link href="/Projects/Projects"><div className={styles.controller_link}>View all projects</div></Link>
                              </div>

                    <div className={styles.project_grid}>
                        {
                          Array.isArray(DAOProposals) && DAOProposals.length > 0 ? (
                            DAOProposals?.slice(0, visible)?.map((item, index)=>{
                              return(
                                <Link href={`/ProposePage/${index}`} key={index}>
                                  <div className={styles.project_item}>
                                    <div className={styles.project_img}>
                                      <Image src="" className={styles.img} alt="project-img" />
                                    </div>
                                    <div className={styles.project_text}>
                                      <div className={styles.project_time}>
                                        {("0000" + hexToDecimal(item[0])).slice(-5)}
                                      </div>
                                      <div className={styles.project_titled}>{item[3]}</div>
                                      <div className={styles.project_desc}>{`${item[4].slice(0, 100)}`}</div>
                                      <div className={styles.project_voteTiming}>
                                        <div className={styles.left_item}>
                                          <h2 className={styles.lowest}>Price in cUSD</h2>
                                          <h1 className={styles.ether}>{((hexToDecimal(item[1]._hex)/1e18).toLocaleString())}</h1>
                                        </div>
                                        <div className={styles.right_item}>
                                          <button className={styles.button}>Vote now</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              )
                            })
                          ):(
                            <Link href="/ProposePage">
                              <h1>There is no available project or you are either not connected</h1>
                            </Link>
                          )
                        }
                    </div>

                      <div className={styles.viewmore_center}>
                      <button onClick={handleMoreProjectItem}
                      className={styles.viewmore_btn}
                      >
                      View more
                      </button>
                    </div>

                  </div>
                  </div>
              </div>
              </div>
        </section>
    )
}

export default Projects
