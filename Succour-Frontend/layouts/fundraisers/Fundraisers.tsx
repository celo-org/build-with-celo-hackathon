import {useState} from 'react'
import styles from './fundraiser.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { data } from '../../layouts/data'
import arrowRightIcon from '../../assets/arrow-right-1.svg'
import Succour_abi from "../../abi/abi.json"
import { useContractRead } from 'wagmi'

const Projects = () => {
  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"

    const [visible, setVisible] = useState(6);

    const handleMoreProjectItem = () => {
      setVisible((prevValue) => prevValue + 6);
    }
    const {data: fundraiser } = useContractRead({
      addressOrName: SuccourAddress,
      contractInterface: Succour_abi,
      functionName: 'returnAllGoFunds'
    })

    const hexToDecimal = (hex:any) => parseInt(hex, 16);

    const headerStyle = {
      color: "white",
      height: "60px",
      textAlign: "center",
      background: "#1C3933",
      borderRadius: "10px",
      fontSize: "16px",
      padding: "1rem"
    }






    return (
          <section className={styles.fundraiser} id="fundraiser">
              <div className={styles.wrapper}>
                  <div className={styles.container}>
                  <div className={styles.fundraiser_container}>
                            <div className={styles.fundraiser_header}>
                            <span className={styles.title}>Some fundraisers</span>
                            <div className={styles.totheright}>

                                <Link href="/Viewmore/Viewmore">
                                  <div className={styles.controller_right}>View all</div>
                                </Link>
                              <div  className={styles.icon}>
                                <Image src={arrowRightIcon} alt='' />
                              </div>

                            </div>
                          </div>

                      <div className={styles.fundraiser_grid}>
                        {
                          Array.isArray(fundraiser) && fundraiser.length > 0 ? (
                            fundraiser?.slice(0, visible)?.map((item, index) => {
                              return (
                              <Link href={`/FundraiserProject/${index}`} key={index}>
                                <div className={styles.fundraiser_item}>
                                  <div className={styles.fundraiser_img}>
                                    <Image src="" className={styles.img} alt="img" />
                                  </div>
                                  <div className={styles.fundraiser_text}>
                                    <div className={styles.fundraiser_titled}>{item[1]}</div>
                                    <div className={styles.fundraiser_desc}>
                                    {item[2].slice(0, 150)}.....
                                    </div>
                                    <div className={styles.box}>
                                      <div
                                      style={{
                                        background: "#7BA29A",
                                        borderRadius: "0px 5px 5px 0px",
                                        height: "8px",
                                        width: String(hexToDecimal(item[4]._hex)/hexToDecimal(item[3]._hex)/100) + "%"
                                      }}
                                      ></div>
                                    </div>
                                    <div className={styles.project_voteTiming}>
                                        <div className={styles.left_item}>
                                          <h2 className={styles.number}>{(hexToDecimal(item[4]._hex)/1e18).toLocaleString()} cUSD raised of {(hexToDecimal(item[3]._hex)/1e18).toLocaleString()}</h2>
                                          <h1 className={styles.donation}>{item[6].length} Donations</h1>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                  </Link>
                                    )
                                  })
                          ):(
                            //@ts-ignore
                            <h1 style={headerStyle}>There is no available fundraiser, you can create one if you have any</h1>
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
        </section>
    )
}

export default Projects
