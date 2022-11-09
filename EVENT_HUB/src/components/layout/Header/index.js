// import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useCelo } from '@celo/react-celo'
import { truncate } from '../../../utils'

import styles from './Header.module.css'

function AppHeader() {

  const { address, connect } = useCelo()


  useEffect(() => {
    // connect()
  })

  return (
    <header className={`app-pd app-bg ${styles.header}`}>
      <div className={styles['menu-icon']}>
        <div></div>
        <div></div>
      </div>
      {/*<div>*/}
      {/*  <Link to='/'>Home</Link>*/}
      {/*  <Link to='/event'>Event</Link>*/}
      {/*  <Link to='/rsvps'>RSVPs</Link>*/}
      {/*</div>*/}
      <div className={styles.connect}>
        {address ? <button>{truncate(address)}</button> : <button onClick={connect}>CONNECT</button>}
      </div>
    </header>
  )

}

export default AppHeader