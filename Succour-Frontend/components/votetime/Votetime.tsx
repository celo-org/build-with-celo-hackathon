import React from 'react'
import styles from './votetime.module.scss'
import { useContractRead, useContractWrite } from 'wagmi'
import { useRouter } from 'next/router'
import Succour_abi from "../../abi/abi.json"

const Votetime = () => {
  const SuccourAddress = "0x12F57C67FDd16109B549F0B40579694fE12bf9Fd"

<<<<<<< HEAD
=======

>>>>>>> d32647a491f8e9a2b7f3ba4c8a15252d7da31dcf
  const {query} = useRouter()

  const pageId = query.id


  const {data: proposalId} = useContractRead({
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'viewAllProposals'
  })


  const hexToDecimal = (hex:any) => parseInt(hex, 16);


// vote preparation
  const {
    data: voteData,
    write: voteDataWrite,
    isLoading: voteLoading
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'memberVote',
    args:[
      proposalId? hexToDecimal(proposalId[Number(pageId)][5]._hex) : ""
    ]
  })

<<<<<<< HEAD
=======


>>>>>>> d32647a491f8e9a2b7f3ba4c8a15252d7da31dcf
  return (
    <div className={styles.votetime}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
      <div className={styles.votetime_container}>
      <button className={styles.btn}>Vote</button>
      <div className={styles.votetime_content}>
        {
          proposalId?.map((item, index)=>
          index == Number(pageId)?
          <>
          <ul className={styles.votetime_info}>
            <li>Number of Votes:</li>
            <li>{hexToDecimal(item[5]._hex)}</li>
          </ul>
          </>: ""
        )
      }

      </div>
      <div className={styles.user_btn}>
        <div className={styles.arrow_down}></div>
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Votetime