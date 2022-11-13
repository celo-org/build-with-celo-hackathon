
import EventLists from '../../components/EventLists'
import EventForm from "../../components/EventForm";
import {useContext} from "react";
import {FormContext} from "../../contexts/AppContext";

const Events = () => {
  const { showEventForm, setShowEventForm } = useContext(FormContext)
  // const [form, setForm] = useState(false)
  return (
    <div class="app-bg">
      <button onClick={() => setShowEventForm(true)} className={'app-btn'}>Create Event</button>
      {showEventForm && (<EventForm />)}

      <EventLists/>
    </div>
  )
}

export default Events