
import { useState, useEffect } from 'react'

import { kit, eventHubContract, connectWallet } from '../../utils/interact'
import { eventList } from '../../utils/ipfs'
import useIsConnected from '../../hooks/useIsConnected'

import styles from './Home.module.css'




function Home() {

  const ipfsGateway = 'https://gateway.pinata.cloud/ipfs'

  const [isConnected, address] = useIsConnected()
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('No connection to the network.')
  const [balances, setBalances] = useState({ CELO: 0, cUSD: 0, Vault: 0 });
  const [info, setInfo] = useState('')

  const getBalanceHandle = async () => {
    const goldtoken = await kit._web3Contracts.getGoldToken();

    const totalBalance = await kit.getTotalBalance(
      process.env.REACT_APP_ADDRESS
    );

    const { CELO, cUSD } = totalBalance;
    setBalances({
      CELO: kit.web3.utils.fromWei(CELO.toString()),
      cUSD: kit.web3.utils.fromWei(cUSD.toString())
    });
  };



  const rsvp = async (eventId, deposit) => {
    // MAX ALLOWANCE
    debugger
    const allowance = kit.web3.utils.toWei("1000000", "ether");
    // GAS ESTIMATOR
    const gasEstimate = kit.gasEstimate;
    // Get the cUSD ContractKit wrapper
    const stableToken = await kit.contracts.getStableToken();

    // Get the gas price minimum and set the new gas price to be double
    const gasPriceMinimumContract = await kit.contracts.getGasPriceMinimum()
    const gasPriceMinimum = await gasPriceMinimumContract.getGasPriceMinimum(stableToken.address)
    const gasPrice = Math.ceil(gasPriceMinimum * 20) // This should be much higher than the current average, so the transaction will confirm faster

    if (isConnected) {
      const res = await eventHubContract.methods.createNewRSVP(eventId).send({from: '0x0F6C01Ea04CBc4E8dF8a1f4565D1eF54C937397a', to: '0x0F6C01Ea04CBc4E8dF8a1f4565D1eF54C937397a', feeCurrency: 90000000000000000000000, gasPrice: 9000000000000000000});
      // // MAX ALLOWANCE
      // const allowance = kit.web3.utils.toWei("1000000", "ether");
      // // GAS ESTIMATOR
      // const gasEstimate = kit.gasEstimate;
      // // ASSET TO ALLOW
      // const goldtoken = await kit._web3Contracts.getGoldToken();
      console.log('the res ', res)
    } else {
      const address = await connectWallet()
      const res = await eventHubContract.methods.createNewRSVP(eventId).send({from: address, feeCurrency: stableToken.address, gasPrice});
      console.log('the rsss ', res)
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

    const txHash = await eventHubContract.methods.getConfirmedRSVPs(eventId).call()
    // const txHash = await eventHubContract.methods.test().call()
    console.log(txHash)

  }


  useEffect(async () => {
    setEvents(await eventList())
    getBalanceHandle()
  }, [])


  return (
    <div className={styles.container}>{info}
      {events.length && events.map(event => (
        <div>
          <img width="200px" src={`${ipfsGateway}/${event.ipfs_pin_hash}`} alt=""/>
          <div>EVent Id: { event.metadata.keyvalues.name }</div>
          {/*<div>Time: { Date(event.metadata.keyvalues.dateAndTime) }</div>*/}
          <div>Time: { event.metadata.keyvalues.dateAndTime }</div>
          {/*<div>CID: { event.eventDataCID }</div>*/}
          <div>Maximum capacity: { event.metadata.keyvalues.capacity }</div>
          <div>Deposit: { kit.web3.utils.fromWei(event.metadata.keyvalues.deposit, 'ether') }</div>
          <button onClick={() => rsvp(event.ipfs_pin_hash, event.metadata.keyvalues.deposit)}>RSVP</button>
          <button onClick={() => confirm(event.ipfs_pin_hash)}>Get confirmed RSVP</button>
        </div>
      ))}
      Balances {balances.CELO}
    </div>
  )
}

export default Home