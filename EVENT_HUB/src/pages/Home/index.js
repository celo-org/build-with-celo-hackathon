
import { useState, useEffect } from 'react'
import { useCelo } from '@celo/react-celo'
import axios from 'axios'

import {contract, eventHubContractAddress} from "../../utils";

import styles from './Home.module.css'
import EventHub from "../../artifacts/contracts/EventHub.sol/EventHub.json";


const Home = () => {
  const ipfsGateway = 'https://gateway.pinata.cloud/ipfs'

  // const [eventHubContract, setEventHubContract] = useState('')
  const { connect, address, kit } = useCelo()
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('')
  const [balances, setBalances] = useState({ CELO: 0, cUSD: 0, Vault: 0 });
  const [info, setInfo] = useState('')


const getBalance = async () => {
  const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)

  const res = await eventHubContract.methods.getBalance().call()
  console.log(res)
}

  const rsvp = async (eventId, deposit) => {

    try {
      if (address) {
        const stableToken = await kit.contracts.getStableToken()
        const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
        // const res = await eventHubContract.methods.createNewRSVP(eventId).call()
        const res = await eventHubContract.methods.createNewRSVP(eventId).send({
          from: address,
          // feeCurrency: stableToken.address,
          gasLimit: '210000',
          value: deposit
        })
        console.log('the res ', res)
      } else {
        await connect()
      }
    } catch (e) {
      console.log('catch ', e.message)
    }
  }

  const confirm = async (eventId) => {
    const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)

    const txHash = await eventHubContract.methods.getConfirmedRSVPs(eventId).call()
    // const txHash = await eventHubContract.methods.getEventLength().call()
    console.log(txHash)

  }

  const confirmAttendee = async (eventId) => {

    try {
      const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)

      const txHash = await eventHubContract.methods.confirmAttendee(eventId, '0x01a3f5cB1BCf260d12A2466cE075398aAB8cA610').send({
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
    console.log(txHash)
  }

  const transfer = async eventId => {
    const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
    const txHash = await eventHubContract.methods.withdrawUnclaimedDeposits(eventId).call()
    // const txHash = await eventHubContract.methods.transfer(eventId).call()
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
    // setEventHubContract(contract(kit))
    // getBalanceHandle()
  }, [])

  return (
    <div className={styles.container}>
      <h4>{status}</h4>
      {events.length && events.map(event => (
        <div>
          <img width="200px" src={`${ipfsGateway}/${event.ipfs_pin_hash}`} alt=""/>
          <div>EVent Name: { event.metadata.keyvalues.name }</div>
          <div>Time: { event.metadata.keyvalues.dateAndTime }</div>
          <div>CID: { event.ipfs_pin_hash }</div>
          <div>Maximum capacity: { event.metadata.keyvalues.capacity }</div>
          <div>Deposit: { kit.connection.web3.utils.fromWei(event.metadata.keyvalues.deposit, 'ether') }</div>
          <button onClick={() => rsvp(event.ipfs_pin_hash, event.metadata.keyvalues.deposit)}>RSVP</button>
          <button onClick={() => confirm(event.ipfs_pin_hash)}>Get confirmed RSVP</button>
          <button onClick={() => confirmAttendee(event.ipfs_pin_hash)}>Confirm Attendee</button>
          <button onClick={() => test(event.ipfs_pin_hash)}>test</button>
          <button onClick={() => transfer(event.ipfs_pin_hash)}>Transfer</button>
          <button onClick={getBalance}>Get Balance</button>
        </div>
      ))}
    </div>
  )
}

export default Home