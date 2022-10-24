import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {ethers} from 'ethers'

import styles from './Header.module.css'

function AppHeader() {

  const [address, setAddress] = useState()

  // function connect(){
  //
  //   if(!window.ethereum) return
  //
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   window.ethereum.enable().then(()=>{
  //     const signer = provider.getSigner()
  //     signer.getAddress().then((result)=>{
  //       setAddress(result)
  //
  //     })
  //   })
  // }

  useEffect(() => {
    // connect()
  })

  return (
    <header className={styles.header}>
      <h1>Event Hub</h1>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/event'>Event</Link>
        <Link to='/rsvps'>RSVPs</Link>
      </div>
      <div>
        <button>Create Event</button>
        <button>Logout</button>
      </div>
    </header>
  )

}

export default AppHeader