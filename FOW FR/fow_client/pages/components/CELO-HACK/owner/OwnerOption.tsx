/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

function OwnerOption() {

  const [donate, setDonate] = useState(false)
  const [resque, setResque] = useState(false)

  const donateClick = () => {
    setDonate(true)
    setResque(false)
  }

  const resqueClick = () => {
    setResque(true)
    setDonate(false)
  }

  const styles = {
    page: `w-screen h-screen flex flex-col justify-between items-center max-w-screen-sm bg-[url('/images2/bg4.png')]`,
    top: `w-full h-2/6 flex justify-center items-center`,
    mid: `w-full h-2/6 flex flex-col justify-between items-center`,
    bottom: `w-full h-1/4 flex flex-col justify-center items-center`,
    logoBox: `w-48 h-42 mt-auto`,
    btn: `w-20 h-20 rounded-full bg-slate-300/[.9] shadow-2xl border-white-900/75`,
    img: `w-28 h-28`,
    bigbtn: `w-full flex justify-center items-center`,
  }

  return (
    <div className="flex justify-center items-center">
      <div className={styles.page}>
        <div className={styles.top}>
          <div className={styles.logoBox}>
            <img src="/images2/fow.png" alt="/" className='w-full h-full mt-auto' />
          </div>
        </div>
        <div className={styles.mid}>
          <div className="flex flex-col justify-start items-center">
            <span className='font-extrabold text-2xl'>Owner Dashboard</span>
            <span className='font-bold text-sm text-gray-600'>choose one</span>
          </div>

          <div className="w-9/12 h-3/6 flex justify-around items-start">

            <div className="flex flex-col justify-center items-center">
              <button className={styles.btn} onClick={donateClick}>
                <img src="/images2/Fundraising.png" alt="/" className='w-full h-full rounded-full' />
              </button>
              <span className='text-xs text-gray-600 font-bold'>Donation request</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <button className={styles.btn} onClick={resqueClick}>
                <img src="/images2/delivery.png" alt="/" className='w-full h-full rounded-full' />
              </button>
              <span className='text-xs text-gray-600 font-bold'>Rescue request</span>
            </div>

          </div>

        </div>
        <div className={styles.bottom}>
          <div className={styles.img}>
            <img src="/images2/confuse.png" className='w-full h-full' alt="/" />
          </div>

          {

            donate 
              
            ? 

            <Link href='/components/CELO-HACK/owner/donarReq/DonarReq'>
              <Button variant='contained' className='w-full bg-sky-700'>
                <span className='capitalize'>See the Donar request</span>
              </Button> 
            </Link>
              
            : 

            <Link href='/components/CELO-HACK/owner/rescueReq/RescuerRequest'>
              <Button variant='contained' className='w-full bg-sky-700'>
                <span className='capitalize'>See the rescuer request</span>
              </Button>
            </Link>

          }

          <div className={styles.bigbtn}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerOption



//afCFgG2xkaAgIap6X2VGCWE5a6ws0nt7