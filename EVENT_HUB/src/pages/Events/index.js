
import EventLists from '../../components/EventLists'
import EventForm from "../../components/EventForm";
import {useState} from "react";

const Events = () => {
  const [form, setForm] = useState(false)
  return (
    <div class="app-bg">
      <button onClick={() => setForm(true)} className={'app-btn'}>Create Event</button>
      {form && (<EventForm />)}

      <EventLists/>
    </div>
  )
}

export default Events