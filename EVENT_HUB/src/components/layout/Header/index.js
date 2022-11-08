import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useCelo} from "@celo/react-celo";
import {ethers} from 'ethers'

import styles from './Header.module.css'

function AppHeader() {

  const { address, connect, disconnect } = useCelo()


  useEffect(() => {
    // connect()
  })

  return (
    <header className={styles.header}>
      <div className={styles['menu-icon']}>
        <div></div>
        <div></div>
      </div>
      {/*<div>*/}
      {/*  <Link to='/'>Home</Link>*/}
      {/*  <Link to='/event'>Event</Link>*/}
      {/*  <Link to='/rsvps'>RSVPs</Link>*/}
      {/*</div>*/}
      <div>
        {address ? <button>{address}</button> : <button onClick={connect}>Connect</button>}
        <button onClick={disconnect}>Logout</button>
      </div>
    </header>
  )

}

export default AppHeader