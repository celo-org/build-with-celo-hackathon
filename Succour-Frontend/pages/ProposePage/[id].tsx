
import React from 'react'
import styles from './proposepage.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Image from 'next/image'
import Link from 'next/link'
import arrowLeftSvg from '../../assets/arrow-left.svg'
import Votetime from '../../components/votetime/Votetime'
import Otherproposal from '../../components/otherproposal/Otherproposal'
import { useContractRead } from 'wagmi'
import { useRouter } from 'next/router'
import Succour_abi from "../../abi/abi.json"



const ProposePage = () => {
  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"


  const {query} = useRouter()

  const pageId = query.id

  const {data: proposalId} = useContractRead({
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'viewAllProposals'
  })

  const hexToDecimal = (hex:any) => parseInt(hex, 16);


  return (
  <>
    <Navbar />
    <div className={styles.page}>

    <div className={styles.wrapper}>
        <div className={styles.left}>
        <div className={styles.back_arrow}>
            <Link href="/Projects/Projects">
            <div className={styles.arrow}>
                <Image src={arrowLeftSvg} alt="" />
              </div>
              </Link>
              </div>
      </div>
      <div className={styles.container}>
        {proposalId?.map((item, index)=>
          index == Number(pageId)?
          <>
          <div className={styles.page_content}>
            <div className={styles.page_info}>
                  <h1>Proposal by</h1>
                  <p>{item[8]}</p>

              {/* <div className={styles.status}>Project</div> */}
            </div>
          </div>

          <div className={styles.problem_details}>
          <div className={styles.detail}>
            <h2 className={styles.problem_title}>{item[3]}</h2>
            <span className={styles.proposal_id}>Proposal ID: {("00000" + hexToDecimal(item[0]._hex)).slice(-6)}</span>
            <span className={styles.proposal_amount}>Proposed Amount</span>
            <span className={styles.amount}>{(hexToDecimal(item[1]._hex)/1e18).toLocaleString()}</span>
          </div>
            <p className={styles.problem_desc}>{item[4]}</p>
          </div>
          </>:
          ""

        )}

      </div>
    </div>
    </div>
    <Votetime />
    {/* <Otherproposal /> */}
    <Footer />
  </>
  )
}

export default ProposePage