import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCelo } from '@celo/react-celo'
import EventHub from '../../artifacts/contracts/EventHub.sol/EventHub.json'
import { cleanDate, eventHubContractAddress } from '../../utils'

import styles from './Events.module.css'


const Events = () => {
  const ipfsGateway = 'https://gateway.pinata.cloud/ipfs'

  const { address, connect, kit } = useCelo()

  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('')

  const getBalance = async () => {
    const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
    const res = await eventHubContract.methods.getBalance().call()
    console.log(res)
  }

  const rsvp = async (eventId, deposit) => {

    try {
      if (address) {
        //TODO make function modular.
        const stableToken = await kit.contracts.getStableToken()
        const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
        // const res = await eventHubContract.methods.createNewRSVP(eventId).call()
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

  const confirm = async (eventId) => {
    const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
    const txHash = await eventHubContract.methods.getConfirmedRSVPs(eventId).call()
    console.log(txHash)

  }

  const confirmAttendee = async (eventId) => {

    try {
      const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)

      const txHash = await eventHubContract.methods.confirmAttendee(eventId, '0x01a3f5cB1BCf260d12A2466cE075398aAB8cA610').send({
        // const txHash = await eventHubContract.methods.confirmAttendee(eventId, '0x9Edd3fb21e1BC3dBE3c5BCf8AB8044c706AAEA9C').send({
        from: address,
        gasLimit: '210000'
      })
      // const txHash = await eventHubContract.methods.confirmAttendee(eventId, address).send({from: address})
      // const txHash = await eventHubContract.methods.getEventLength().call()
      console.log('gg ', txHash)
    } catch (e) {
      setStatus(e.message)
    }

  }

  const test = async eventId => {
    const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
    const txHash = await eventHubContract.methods.getEvent(eventId).call()
    // const txHash = await eventHubContract.methods.withdrawUnclaimedDeposits(eventId).call()
    console.log(txHash)
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
        })
      setEvents(res)
    }
    eventList()
  }, [])

  return (
    <div className={`${styles['event-container']}`}>
      {events.length && events.map(event => (
        <div className={styles['event-item']}>
          <h4>{event.metadata.keyvalues.name}</h4>
          <span>Refundable Deposit: {kit.connection.web3.utils.fromWei(event.metadata.keyvalues.deposit, 'ether')} cUSD</span>
          <span>Capacity: {event.metadata.keyvalues.capacity}</span>
          <span>Date: {cleanDate(event.metadata.keyvalues.dateAndTime)}</span>
          <button onClick={() => rsvp(event.ipfs_pin_hash, event.metadata.keyvalues.deposit)}>RSVP</button>
          <img width="200px" src={`${ipfsGateway}/${event.ipfs_pin_hash}`} alt=""/>
        </div>
      ))}
    </div>
  )
}

export default Events