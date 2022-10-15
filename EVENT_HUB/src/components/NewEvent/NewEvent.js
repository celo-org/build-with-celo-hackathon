import { React, useState } from 'react';
import './NewEvent.css';

import { ethers } from 'ethers';
import RSVP from '../../artifacts/contracts/RSVP.sol/RSVP.json';

function NewEvent() {
  
  const [eventName, setEventName] = useState();
  const [eventNumber, setEventNumber] = useState();
  const [eventPrice, setEventPrice] = useState();
  const [eventDays, setEventDays] = useState();
  const [eventOwner, setEventOwner] = useState();

const rsvpAddress = '0x58D94818de8aF453A89cdff35c05fe469678d192';

  async function createEvent (e) {
    e.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(rsvpAddress, RSVP.abi, signer);

      console.log('Hey, it works!');
      console.log(eventName);
      console.log({ eventNumber });
      console.log({ eventPrice });
      console.log({ eventDays });
      console.log({ eventOwner });


      const setEvent = await contract.createNewEvent(eventName, eventNumber, eventPrice, eventDays, eventOwner);
      await setEvent.wait();
      const listenerList = await contract.listeners('NewEventCreated');
      await contract.on('NewEventCreated');
      
                  
    }
}

  return (
    <div className='new-event'>
        <div className='form-container'>
          <h1 className='create-label'>Create an event</h1>
          <form onSubmit={createEvent} className='new-event-form'>
            <div className='name-container'>
              <label className='event-name-label'>Event Name: </label>
              <input className='event-name' type='text' onChange={ e => setEventName(e.target.value) }/>
            </div>
            <div className='number-container'>
              <label className='event-number-label'>Max Number Allowed: </label>
              <input className='event-number' type='text' onChange={ e => setEventNumber(e.target.value) }/>
            </div>
            <div className='price-container'>
              <label className='event-price-label'>RSVP Price: </label>
              <input className='event-price' type='text' onChange={ e => setEventPrice(e.target.value) }/>
            </div>
            <div className='reg-days-container'>
              <label className='event-reg-label'>Registration Period (In Days): </label>
              <input className='event-reg-days' type='text' onChange={ e => setEventDays(e.target.value) }/>
            </div>
            <div className='owner-container'>
              <label className='event-owner-label'>Event Owner: </label>
              <input className='event-owner' type='text' onChange={ e => setEventOwner('0xfCdcB824747B3b8e4058E90a59468eD0ef538Ae9') }/>
            </div>
            <button className='event-create-submit' type='submit'>Create</button>
          </form>
        </div>
    </div>
  )  
}

export default NewEvent;
