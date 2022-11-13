import React from 'react'
import styles from './votetime.module.scss'
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'
import { useRouter } from 'next/router'
import Succour_abi from "../../abi/abi.json"
import { toast } from 'react-toastify'

const Votetime = () => {
  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"

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

  const {isLoading: membervoteloading } = useWaitForTransaction({
    hash: voteData?.hash,
    onSuccess(){
      toast.success('Transaction sent successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 8000,
      })
    },
    onError(){
      toast.error('Error encountered on voting', {
        position: toast.POSITION.TOP_CENTER
    })
    }
  })

  const handleSubmit = (e:any) => {
    e.preventDefault();

    voteDataWrite();
  }

  return (
    <div className={styles.votetime}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
      <div className={styles.votetime_container}>
      <button
      className={styles.btn}
      disabled={voteLoading || membervoteloading}
      onClick={handleSubmit}
      >
        {(voteLoading || membervoteloading) ? "Loading..." : "Vote"}
      </button>
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
