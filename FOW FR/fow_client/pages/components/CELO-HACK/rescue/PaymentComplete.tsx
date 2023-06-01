/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';

function PaymentComplete() {

  const styles = {
    page: `w-screen max-w-screen-sm h-screen flex flex-col justify-around items-center`,
    main: `w-full h-4/6 flex flex-col justify-around items-center`,
    btn: `w-10/12 h-1/6 flex justify-center items-center max-w-screen-sm`,
    one: `h-36 w-36 rounded-full bg-slate-300/[.9] shadow-2xl border-white-900/75`,
    two: `h-24 w-full flex flex-col justify-around items-center`,
    three: `h-16 w-9/12 flex flex-col justify-around items-center`,
    button: `h-3/6 w-10/12 bg-sky-700`,
  }

  return (
    <div className="flex justify-center items-center bg-inherit">
      <div className={styles.page}>
        <div className={styles.main}>
          <div className={styles.one}>
            <img src="/images2/tick.png" className='w-full h-full' />
          </div>
          <div className={styles.two}>
            {/* <span className='font-semibold text-3xl'>${data.finalAmount}</span> */}
            <span className='text-2xl font-bold text-black'>Thank You!</span>
            <span className='text-xs text-gray-600'>Please use the link below to track your Food Rescue Process</span>
          </div>
          <div className={styles.three}>
            <span className='font-semibold text-xl text-black'>Verification Code:</span>
            <span className='font-semibold text-gray-600 text-sm'>
              12udb42234yhjfdrf
            </span>
          </div>
        </div>
        <div className={styles.btn}>
          <Link href="/components/CELO-HACK/rescue/MyRescues">
            <Button variant="contained" className={styles.button}>Done</Button>
          </Link>
          {/* <Button variant="contained" className={styles.button} onClick={back}>Done</Button> */}
        </div>
      </div>
    </div>
  )
}

export default PaymentComplete