
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCelo } from '@celo/react-celo'
import Events from '../../components/Events'

import uspImg from '../../assets/img/usp-img.png'

import styles from './Home.module.css'


const Home = () => {
  const ipfsGateway = 'https://gateway.pinata.cloud/ipfs'

  const navigate = useNavigate()

  const { connect, address, kit } = useCelo()
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('')




  return (
    <div className={styles.container}>
      <div className={`app-bg ${styles.hero}`}>
        <h1 class={styles['app-name']}>Event <br/>Hub</h1>
      </div>
      <div className={`app-bg app-pd ${styles.usp}`}>
        <div className={styles['usp-txt']}>
          <h2>Get rewarded for attending events</h2>
          <p>Get refunded for attending while you share from a pool of event absentees. It is that simple!</p>
        </div>
        <img src={uspImg} alt="usp"/>
      </div>

      <div className={`app-bg ${styles.events}`}>
        <h1>Upcoming Events</h1>
        <Events/>
        <div className={styles['button-container-div']}>
          <button onClick={() => navigate('/event')} className="app-btn">VIEW MORE</button>
        </div>
      </div>
    </div>
  )
}

export default Home