import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useCelo } from '@celo/react-celo'
import EventHub from '../../artifacts/contracts/EventHub.sol/EventHub.json'
import { cleanDate, eventHubContractAddress } from '../../utils'
import Loader from '../Loader'


import styles from './EventLists.module.css'

const EventLists = () => {
  const ipfsGateway = 'https://gateway.pinata.cloud/ipfs'

  const location = useLocation()
  const { address, connect, kit } = useCelo()

  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('')
  const [eventPage, setEventPage] = useState(false)
  const [confirmForm, setConfirmForm] = useState(false)
  const [attendeeAddress, setAttendeeAddress] = useState('')

  const rsvp = async (eventId, deposit) => {

    try {
      if (address) {
        //TODO make function modular.
        const stableToken = await kit.contracts.getStableToken()
        const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
        const res = await eventHubContract.methods.createNewRSVP(eventId).send({
          from: address,
          feeCurrency: stableToken.address,
          gasLimit: '210000',
          value: deposit
        })
        console.log(res)
      } else {
        const result = await connect()
        if (result) {
          const stableToken = await kit.contracts.getStableToken()
          const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
          const res = await eventHubContract.methods.createNewRSVP(eventId).send({
            from: address,
            feeCurrency: stableToken.address,
            gasLimit: '210000',
            value: deposit
          })
          console.log(res)
        }
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  const confirmAttendee = async (eventId) => {

    try {
      const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)

      const txHash = await eventHubContract.methods.confirmAttendee(eventId, attendeeAddress).send({
        from: address,
        gasLimit: '210000'
      })
      console.log('gg ', txHash)
    } catch (e) {
      setStatus(e.message)
    }

  }

  const transfer = async eventId => {
    const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
    // const txHash = await eventHubContract.methods.withdrawUnclaimedDeposits(eventId).call()
    const txHash = await eventHubContract.methods.payOut(eventId).send({
      from: address,
      gasLimit: '210000'
    })
    console.log(txHash)
  }

  useEffect( () => {
    async function eventList () {

      setLoading(true)

      const url = `https://api.pinata.cloud/data/pinList?status=pinned`
      const res = await axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
          }
        })
        .then(function (response) {
          return response.data.rows
        })
        .catch(function (error) {
          console.log(error)
          setLoading(false)
        })

      if (res) {
        setLoading(false)
        setEvents(res)
      }

    }
    eventList()

    if (location.pathname === '/events') {
      setEventPage(true)
    }

  }, [location])

  return (

      <div className={`${styles['event-container']}`}>

      {!loading && events.length && events.map(event => (
        <div  className={eventPage ? styles['page-event-item'] : styles['event-item']}>
          <h4>{event.metadata.keyvalues.name}</h4>
          <span>Refundable Deposit: {kit.connection.web3.utils.fromWei(event.metadata.keyvalues.deposit, 'ether')} cUSD</span>
          <span>Capacity: {event.metadata.keyvalues.capacity}</span>
          <span>Date: {cleanDate(event.metadata.keyvalues.dateAndTime)}</span>
          <button onClick={() => rsvp(event.ipfs_pin_hash, event.metadata.keyvalues.deposit)}>RSVP</button>
          {confirmForm && (
            <div>
              <input type="text" onChange={e => setAttendeeAddress(e.target.value)}/>
              <button onClick={() => confirmAttendee(event.ipfs_pin_hash)}>Confirm Attendee</button>
            </div>


          )}
          {event.metadata.keyvalues.owner === address && (
            <div>
              <button onClick={() => setConfirmForm(true)}>Confirm Attendee</button>
              <button onClick={() => transfer(event.ipfs_pin_hash)}>Payout</button>
            </div>
          )}
          <img width="200px" src={`${ipfsGateway}/${event.ipfs_pin_hash}`} alt=""/>
        </div>
      ))}

      {loading && <div className="loader-container"><Loader/></div>}
    </div>

  )
}

export default EventLists