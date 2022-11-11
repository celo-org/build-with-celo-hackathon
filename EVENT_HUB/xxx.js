import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCelo } from '@celo/react-celo'
import EventHub from '../../artifacts/contracts/EventHub.sol/EventHub.json'
import { cleanDate, eventHubContractAddress } from '../../utils'

import schedule from '../../assets/img/schedule.png'
import capacity from '../../assets/img/capacity.png'
import amount from '../../assets/img/amount.png'

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
    <div>
      {events.length && events.map(event => (
        <div>
          <img width="200px" src={`${ipfsGateway}/${event.ipfs_pin_hash}`} alt=""/>
          <h4>{ event.metadata.keyvalues.name }</h4>
          <div className={styles['event-detail']}>
            <img src={schedule} alt="schedule"/>
            { cleanDate(event.metadata.keyvalues.dateAndTime) }
          </div>
          <div className={styles['event-detail']}>
            <img src={capacity} alt="capacity"/>
            { event.metadata.keyvalues.capacity }
          </div>
          <div className={styles['event-detail']}>
            <img src={amount} alt="amount"/>
            { kit.connection.web3.utils.fromWei(event.metadata.keyvalues.deposit, 'ether') }
          </div>
          {/*<button onClick={() => rsvp(event.ipfs_pin_hash, event.metadata.keyvalues.deposit)}>RSVP</button>*/}
          {/*<button onClick={() => confirm(event.ipfs_pin_hash)}>Get confirmed RSVP</button>*/}
          {/*<button onClick={() => confirmAttendee(event.ipfs_pin_hash)}>Confirm Attendee</button>*/}
          {/*<button onClick={() => test(event.ipfs_pin_hash)}>test</button>*/}
          {/*<button onClick={() => transfer(event.ipfs_pin_hash)}>Transfer</button>*/}
          {/*<button onClick={getBalance}>Get Balance</button>*/}
          {/*<h4>{status}</h4>*/}
        </div>
      ))}
    </div>
  )
}

export default Events