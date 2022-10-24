
import { useState, useEffect } from 'react'
import { useCelo } from '@celo/react-celo'
import axios from 'axios'
import EventHub from '../../artifacts/contracts/EventHub.sol/EventHub.json'

import {contract} from "../../utils";
// import { useContract } from '../../hooks'

// import { kit, eventHubContract, connectWallet } from '../../utils/interact'
// import { eventList } from '../../utils/ipfs'

import styles from './Home.module.css'
// import EventHub from "../../artifacts/contracts/EventHub.sol/EventHub.json";

const eventHubContractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'
// import {connectWallet, eventHubContract, kit} from "../../utils/interact";

const Home = () => {
  const ipfsGateway = 'https://gateway.pinata.cloud/ipfs'

  const [eventHubContract, setEventHubContract] = useState('')
  const { connect, address, kit, getConnectedKit } = useCelo()
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('No connection to the network.')
  const [balances, setBalances] = useState({ CELO: 0, cUSD: 0, Vault: 0 });
  const [info, setInfo] = useState('')




  const rsvp = async (eventId, deposit) => {
    // MAX ALLOWANCE
    // const allowance = kit.web3.utils.toWei("1000000", "ether");
    // // GAS ESTIMATOR
    // const gasEstimate = kit.gasEstimate;
    // // Get the cUSD ContractKit wrapper
    // const stableToken = await kit.contracts.getStableToken();
    //
    // // Get the gas price minimum and set the new gas price to be double
    // const gasPriceMinimumContract = await kit.contracts.getGasPriceMinimum()
    // const gasPriceMinimum = await gasPriceMinimumContract.getGasPriceMinimum(stableToken.address)
    // const gasPrice = Math.ceil(gasPriceMinimum * 20) // This should be much higher than the current average, so the transaction will confirm faster

    if (address) {
      const res = await eventHubContract.methods.createNewRSVP(eventId).send({from: address})
      console.log('the res ', res)
    } else {
      await connect()
    }


    // if (isConnected) {

    // const res = await eventHubContract.methods.createNewRSVP(eventId).send({
    //   // from: process.env.REACT_APP_ADDRESS,
    //   from: '0x0F6C01Ea04CBc4E8dF8a1f4565D1eF54C937397a',
    //   // value: deposit
    //   value: kit.web3.utils.toWei(deposit)
    // })
    // console.log(res)
    //
    // eventHubContract.events.NewRSVP()
    //   .on("connected", function(subscriptionId){ console.log(subscriptionId);})
    //   .on('data', function(event){ console.log(event);})
    // }

  }

  const confirm = async (eventId) => {

    // const txHash = await eventHubContract.methods.getConfirmedRSVPs(eventId).call()
    const txHash = await eventHubContract.methods.getEventLength().call()
    console.log(txHash)

  }

  const test = async () => {
    debugger
    // const kit = await getConnectedKit();
    // const nftContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)
    // const txHash = await eventHubContract.methods.getConfirmedRSVPs(eventId).call()
    const txHash = await eventHubContract.methods.getEventLength().call()
    // const txHash = await nftContract.methods.totalEvents().call()
    console.log(txHash)

  }

  useEffect( () => {
    async function eventList () {

      const url = `https://api.pinata.cloud/data/pinList?status=pinned`
      const res = await axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTg1ODU2Yi0xYmUyLTQyY2MtOTRkMC1hZGJhYmIwNjE0MDciLCJlbWFpbCI6ImNqdXN0aW5vYmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjhmMmFlZjI2YzdmYTc3YWNiZmY2Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDAzNmEwZDBjMzZjYzUyOTE3ZDA5MjlkY2ZlMTc4Njk3NTBmNjM1NGE3YzdiODE4ZDQzNGYxY2NlNDFhY2QyZSIsImlhdCI6MTY2Mzg4Mzc5N30.9_TyYUidh1Y-I67a4AXpmlVvf-WSwnq7RjydDDKe7cI'
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
    setEventHubContract(contract(kit))
    // getBalanceHandle()
  }, [])

  return (
    <div className={styles.container}>
      <button onClick={test}>Length</button>
      {events.length && events.map(event => (
        <div>
          <img width="200px" src={`${ipfsGateway}/${event.ipfs_pin_hash}`} alt=""/>
          <div>EVent Id: { event.metadata.keyvalues.name }</div>
          {/*<div>Time: { Date(event.metadata.keyvalues.dateAndTime) }</div>*/}
          <div>Time: { event.metadata.keyvalues.dateAndTime }</div>
          {/*<div>CID: { event.eventDataCID }</div>*/}
          <div>Maximum capacity: { event.metadata.keyvalues.capacity }</div>
          {/*<div>Deposit: { kit.web3.utils.fromWei(event.metadata.keyvalues.deposit, 'ether') }</div>*/}
          <button onClick={() => rsvp(event.ipfs_pin_hash, event.metadata.keyvalues.deposit)}>RSVP</button>
          <button onClick={() => confirm(event.ipfs_pin_hash)}>Get confirmed RSVP</button>
        </div>
      ))}
    </div>
  )
}

export default Home