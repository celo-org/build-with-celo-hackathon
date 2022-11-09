import React from 'react'
import styles from './memberprofile.module.scss'
import SearchIcon from '../../assets/search-normal.svg'
import Image from 'next/image'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useContractRead, useAccount } from 'wagmi'
import Succour_abi from "../../abi/abi.json"

const MemberProfile = () => {


  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"
  const { address } = useAccount();

  const {data: memberslist} = useContractRead({
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: "viewMembers"
  })






  const {data: totalBalance} = useContractRead({
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'totalDAOBalance',
  })




  const hexToDecimal = (hex:any) => parseInt(hex, 16);


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
                      {
                        memberslist? memberslist.map((item, index) =>
                        <tr className={styles.tr} key={index}>
                              <td className={styles.td}> <span>{("000" + hexToDecimal(item[1]._hex)).slice(-4)}</span>{" "}{item[0]}</td>
                              <td className={styles.td}>{item[2]}</td>
                              <td className={styles.td}>{((hexToDecimal(item[3]._hex)/1e18).toLocaleString())}</td>
                              <td className={styles.td}>{hexToDecimal(item[4]._hex)}</td>
                              <td className={styles.td}>{((hexToDecimal(item[3]._hex)/(hexToDecimal(totalBalance?._hex)))*100).toFixed()}%</td>
                        </tr>
                        ): ""
                      }
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
