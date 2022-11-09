import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import DoneIcon from '@mui/icons-material/Done';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async(contex) => {

  return {
    revalidate: 5,
    props: {
      value: {
        donationPickup: false,
        NFTreceived: false,
        donationReceived: false,
        donationClosed: false
      }
    }
  }

}

function DonationInfo(props: any) {

  const styles = {
    box: `w-full h-full flex flex-col justify-around items-start ease-in duration-500`,
    bg: `border-2 w-14 p-2 rounded-xl border-sky-600`,
    subBox: `border-2 border-sky-600 rounded-xl bg-slate-300/[.9] shadow-2xl border-white-900/75 w-full h-full mt-1 mb-1 flex`,
    dark: `font-bold text-sm`,
    light: `font-bold text-xs text-gray-600`,
    textBox: `flex flex-col justify-around ml-3 h-full`,
  }

  return (
    <div className={styles.box}>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <MinorCrashIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation pick up:</span>
          <div className="font-bold">
            {
              props.value.donationPickup
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              "N/A"
            }
          </div>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <DoneAllIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>NFT Received:</span>
          <div className="font-bold">
            {
              props.value.NFTreceived
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              "N/A"
            }
          </div>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <HowToRegIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation Received:</span>
          <div className="font-bold">
            {
              props.value.donationReceived
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              "N/A"
            }
          </div>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <ThumbUpIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation Accepted:</span>
          <div className="font-bold">
            {
              props.value.donationReceived
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              "N/A"
            }
          </div>
        </div>
      </div>

      {/* <div className={styles.subBox}>  
        <div className={styles.bg}>
          <AttachFileIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Proof Attachment:</span>
          <Button variant='contained' size='small'>
            <span className='text-sm capitalize'>click</span>
          </Button>
        </div>
      </div> */}

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <SentimentSatisfiedAltIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation closed:</span>
          <div className="font-bold">
            {
              props.value.donationClosed
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              "N/A"
            }
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <VolunteerActivismIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation Complete:</span>
          <div className="font-bold">
            {
              props.value.donationClosed
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              "N/A"
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationInfo