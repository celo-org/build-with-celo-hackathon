import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';

function SignInPage() {

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  const Continue = async () => {
    try {
      console.log(email)
      console.log(passwd)
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    page: `w-screen h-screen flex flex-col justify-around items-center`,
    top: `w-10/12 h-32 flex justify-center items-center max-w-screen-sm`,
    middle: `w-10/12 flex flex-col justify-between items-center max-w-screen-sm`,
    bottom: `w-10/12 flex flex-col justify-between items-center mb-10 max-w-screen-sm`,
    emailBox: `w-full bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 mb-5 rounded-md max-w-screen-sm`,
    email: `w-full bg-slate-300/[.0] border-white-900/75 focus:outline-none text-sm max-w-screen-sm`,
    passwordBox: `w-full bg-slate-300/[.9] shadow-2xl border-white-900/75 p-2 rounded-md text-sm max-w-screen-sm`,
    password: `w-full bg-slate-300/[.0] border-white-900/75 focus:outline-none max-w-screen-sm`,
    signupBox: `w-full flex justify-end items-center text-xs cursor-pointer`,
    signup: ``,
    buttonBox: ``,
    button: `bg-blue-600 pl-6 pr-6 pt-2 pb-2 text-sm capitalize`,
    hr: `w-10 h-2 rounded-md bg-blue-500`,
    option: `mt-10`,
    appleBox: `w-full mt-4 mb-4 max-w-xl`,
    apple: `bg-blue-600 text-sm w-full max-w-xl capitalize`,
    two: `flex`,
    facebookBox: `mr-5 cursor-pointer`,
    facebook: `w-14`,
    googleBox: `cursor-pointer`,
    google: `w-14`,
  }


  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <div className='w-32 h-32 rounded-full'>
          <img src="/images/fow.png" className='w-full h-full rounded-full' />
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.emailBox}>
          <input type="email" placeholder='Your email' className={styles.email} onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className={styles.passwordBox}>
          <input type="password" placeholder='Password' className={styles.password} onChange={(e) => setPasswd(e.target.value)} value={passwd} />
        </div>
        <Link href='/components/FOW/Signup'>
          <div className={styles.signupBox}>
            <span className={styles.signup}>Sign up</span>
          </div>
        </Link>
        <Link href="/components/FOW/Additional">
          <div className={styles.buttonBox}>
            <Button variant="contained" className={styles.button} onClick={Continue}>Continue</Button>
          </div>
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.hr}>
          <span> </span>
        </div>
        <div className={styles.option}>
          <span className='text-slate-500'>Or continue with</span>
        </div>
        <div className={styles.appleBox}>
          <Link href='/components/FOW/Signup'>
            <Button variant="contained" className={styles.apple}>Sign In With Email</Button>
          </Link>
        </div>
        <div className={styles.two}>
          <div className={styles.facebookBox}>
            <img src="/images/facebook-icon.png" className={styles.facebook} />
          </div>
          <div className={styles.googleBox}>
            <img src="/images/google-logo.png" className={styles.google} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
