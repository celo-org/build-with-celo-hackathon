import { useContext, useEffect, useState } from 'react'
import { useCelo } from '@celo/react-celo'
import { FormContext } from '../../contexts/AppContext'
import { ethers } from 'ethers'
import { eventHubContractAddress } from '../../utils'
import { addToIPFS } from '../../utils/ipfs'
import EventHub from '../../artifacts/contracts/EventHub.sol/EventHub.json'

import styles from './EventForm.module.css'

const EventForm= () => {
  const { showEventForm, setShowEventForm } = useContext(FormContext)

  const { address, kit } = useCelo()

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [eventName, setEventName] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [maxCapacity, setMaxCapacity] = useState('')
  const [refund, setRefund] = useState('')
  const [eventLink, setEventLink] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventFile, setEventFile] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (address) {
      await createEvent()
    } else {
      console.log(kit.connection)

    }

  }

  const saveToIPFS = async () => {
    const eventDateAndTime = new Date(`${eventDate} ${eventTime}`)
    return await addToIPFS(
      eventName,
      ethers.utils.parseEther(refund),
      eventDateAndTime,
      eventDateAndTime.getTime(),
      maxCapacity,
      eventLink,
      eventFile,
      address
    )
  }

  const createEvent = async () => {
    setLoading(true)
    const CID = await saveToIPFS()
    // return console.log(CID)


    let deposit = ethers.utils.parseEther(refund);
    // let deposit = refund
    let eventDateAndTime = new Date(`${eventDate} ${eventTime}`);
    let eventTimestamp = eventDateAndTime.getTime();


    try {
      const stableToken = await kit.contracts.getStableToken()
      const eventHubContract = new kit.connection.web3.eth.Contract(EventHub.abi, eventHubContractAddress)

      const res = await eventHubContract.methods.createNewEvent(eventTimestamp, deposit, maxCapacity, CID, CID).send({
        from: address,
        feeCurrency: stableToken.address,
        gasLimit: '910000',

      })
      if (res) {
        setLoading(false)
      }

    } catch (error) {
      setLoading(false)
      console.log("😥 " + error)
      setStatus("😥 " + error.message)
    }

    setStatus(status)
  }

  const loginToMetamask = async () => {
    const accounts = await kit.connection.web3.eth.getAccounts()
    if (!accounts.length) {
      await kit.connection.web3.eth.requestAccounts()
    }
  }

  const reset = () => {
    setShowEventForm(false)
  }

  useEffect(() => {
    loginToMetamask()
  })


  return (
    // <div className={`app-bg ${styles.container} ${showEventForm ? '' : styles['hide-form']}`} onClick={reset}>
      <form id="form" onSubmit={handleSubmit} className={styles.form}>
        <h4>{status}</h4>
        <h4>{loading ? 'loading ...' :  ''}</h4>
        <div className="">
          <div className="">
            <label htmlFor="eventname" className="">
              Event name
            </label>
            <div className="">
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.date}>
              <label htmlFor="date" className="">Date</label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div className={styles.time}>
              <label htmlFor="time" className="">Time</label>
              <input type="time" required value={eventTime} onChange={(e) => setEventTime(e.target.value)}/>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.max}>
              <label>Max capacity</label>
              <input type="number" min="1" inputMode="numeric" placeholder="100" value={maxCapacity} onChange={(e) => setMaxCapacity(parseInt(e.target.value))}/>
            </div>
            <div className={styles.file}>
              <label>File</label>
              <input type="file" placeholder="file" onChange={ e => setEventFile(e.target.files[0]) }/>
            </div>
          </div>
          <div className={styles.grid}>
            <div className={styles.deposit}>
              <label className="">Refundable deposit</label>
              <input
                type="number"
                min="0"
                inputMode="decimal"
                placeholder="0.00"
                value={refund}
                onChange={(e) => setRefund(e.target.value)}
              />
            </div>
            <div className="">
              <label>Event link</label>
              <input type="text" className="" required value={eventLink} onChange={(e) => setEventLink(e.target.value)}/>
            </div>
          </div>
          <div className="">
            <label htmlFor="about" className="">Event description</label>
            <textarea rows={2} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}/>
          </div>
        </div>
        <div className="">
          <button type="button" onClick={() => showEventForm(false)}>Cancel</button>
          <button type="button" className="">Create</button>
        </div>
      </form>
    // </div>
  )
}

export default EventForm