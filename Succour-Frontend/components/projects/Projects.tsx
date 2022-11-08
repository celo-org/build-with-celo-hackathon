import {useState} from 'react'
import styles from './projects.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { data } from '../../pages/data'
import Succour_abi from "../../abi/abi.json"
import { useAccount, useContractRead } from 'wagmi'

const Projects = () => {

    const [visible, setVisible] = useState(6);
    const [displayProposal, setDisplayProposal] = useState(true);

    const handleMoreProjectItem = () => {
      setVisible((prevValue) => prevValue + 6);
    }

    const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"


    // read proposed project from the contract

    const {data: DAOProposals} = useContractRead({
      addressOrName: SuccourAddress,
      contractInterface: Succour_abi,
      functionName: 'viewAllProposals'
    })

    const {data: approvedProposals} = useContractRead({
      addressOrName: SuccourAddress,
      contractInterface: Succour_abi,
      functionName: 'viewAllApprovedProposals'
    })

    console.log(approvedProposals,' approved')

    const hexToDecimal = (hex:any) => parseInt(hex, 16);

    // temporarily

    const headerStyle = {
      color: "white"
    }



    return (
          <section className={styles.projects}>
              <div className={styles.wrapper}>
                  <div className={styles.container}>
                  <div className={styles.project_container}>
                            <div className={styles.project_header}>
                            <span className={styles.title}>Projects</span>
                            <div className={styles.totheright}>
                              <div className={styles.controller_left} onClick={()=> setDisplayProposal(true)}>All proposals</div>
                              <div className={styles.controller_right} onClick={()=> setDisplayProposal(false)}>Approved proposals</div>
                            </div>
                          </div>

                {
                  displayProposal ? (
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
                                          <h2 className={styles.lowest}>Amount Proposed</h2>
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
                            <Link href="/ProposePage" className={styles.project_available}>
                              <h1 style={headerStyle}>There is no available project proposal or you are either not connected</h1>
                            </Link>
                          )
                        }
                    </div>
                  ) : (
                        <div className={styles.project_grid}>
                        {
                          Array.isArray(approvedProposals) && approvedProposals.length > 0 ? (
                            approvedProposals?.slice(0, visible)?.map((item, index)=>{
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
                                          <h2 className={styles.lowest}>Amount Gotten</h2>
                                          <h1 className={styles.ether}>{((hexToDecimal(item[2]._hex)/1e18).toLocaleString())}</h1>
                                        </div>
                                        <div className={styles.right_item}>
                                          <button className={styles.button}>Donate now</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              )
                            })
                          ):(
                            <Link href="/ProposePage">
                              <h1 style={headerStyle}>There is no available approved project proposal or you are either not connected</h1>
                            </Link>
                          )
                        }
                    </div>

                  )

                }
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
        </section>
    )
}

export default Projects