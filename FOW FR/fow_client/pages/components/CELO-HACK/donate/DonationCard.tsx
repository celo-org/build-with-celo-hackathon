/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DonationInfo from './DonationInfo';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async(contex) => {

  return {
    revalidate: 5,
    props: {
      data: {
        donationInfo: null,
        donationClosed: false,
      }
    }
  }

}

function DonationCard(props: any) {

  const [donationData, setDonationData] = useState({})
  const [click, setClick] = useState(false)

  let url = `${props.data.donationInfo}`

  const fetchData = () => {
    setClick(prev => !prev)
    fetch(url)
      .then(response => response.json())
      .then((jsonData) => {
        setDonationData(jsonData)
        console.log("jsonData: ", jsonData)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const styles = {
    imgbg: `w-72 h-56 flex justify-center items-center rounded-xl bg-sky-600 mb-2`,
    img: `w-8/12 h-4/6 rounded-xl bg-white`
  }


  return (
    <div className="w-full mt-3 flex flex-col justify-center items-center">
      <div className={styles.imgbg}>
        {
          props.data.donationClosed
          ?
          <img src="/images2/tick.png" className={styles.img} alt="/"/>
          :
          <img src="/images2/donate.png" className={styles.img} alt="/"/>
        }
      </div>
      <div className="w-full flex justify-around items-center">
        <span className='text-sm font-bold text-black'>Donation Id: {props.data.donationId}</span>
        <Button variant='contained' className='bg-sky-700'>
          <span className='text-sm capitalize' onClick={fetchData}>{!click ? "see details" : "hide details"}</span>
        </Button>
      </div>
      {
        click ?
        <div className="w-10/12 h-full mt-2 mb-2 flex flex-col justify-around items-center ease-in duration-500">
          <DonationInfo data={donationData} value={props.data} />
        </div>
        :
        <div></div>
      }
      
    </div>
  )
}

export default DonationCard