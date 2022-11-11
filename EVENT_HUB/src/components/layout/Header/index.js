import { useEffect, useContext} from 'react'
import { useCelo } from '@celo/react-celo'
import { truncate } from '../../../utils'

import styles from './Header.module.css'
import {DrawerContext} from "../../../contexts/DrawerContext";

const AppHeader = () => {

  const { address, connect } = useCelo()

  const { drawer, setDrawer } = useContext(DrawerContext)

  useEffect(() => {
    // connect()
  })

  return (
    <header className={`app-pd app-bg ${styles.header}`}>
      <div onClick={() => setDrawer(!drawer)} className={styles['menu-icon']}>
        <div></div>
        <div></div>
      </div>

      <div className={styles.connect}>
        {address ? <button className="app-btn">{truncate(address)}</button> : <button className="app-btn" onClick={connect}>CONNECT</button>}
      </div>
    </header>
  )

}

export default AppHeader