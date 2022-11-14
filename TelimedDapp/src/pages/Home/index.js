import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Animated } from 'react-animated-css'

import heroMap from '../../assets/img/hero.jpg'
import patient from '../../assets/img/patient.svg'
import doctor from '../../assets/img/doctor.svg'

import {
  Hero,
  Flow,
  Signup
} from './Home.styles'

const Home = () => {
  let location = useLocation()

  useEffect(() => {
    if (window.innerWidth <= 767) {
      const openMenu = document.getElementById('open-menu')
      const hideMenu = document.getElementById('hide-menu')
      const sidebar = document.getElementById('sidebar')

      openMenu.style.display = 'block'
      hideMenu.style.display = 'none'
      sidebar.style.width = '0'
    }
  }, [location])

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <Hero className="app-mx">
        <div>
          <h1>Convenient, Secure & <br/> Efficient Healthcare service </h1>
          <p>
            Healthcare management solution in your pocket
          </p>
        </div>
        <img width="50%" src={heroMap} alt="" />
      </Hero>



      <Flow id="about">
        <div className="flow-text">
          <h1>
            Telemed is disrupting the way specialist in health sector is delivering health care services.
            The company specializes in developing smart solutions for the healthcare ecosystem. In a growing digital environment,
            we modernize the patient and consumer experience. A growing team
            of health-tech enthusiasts, we are open to discussions
            and brainstorming over a cup of coffee - anytime!
          </h1>
        </div>
      </Flow>
      <div className="personae m-sm-12 m-md-32">
        <div id="patient" style={{marginBottom: '60px'}}>
          <h1 className="text-5xl app-mx">Patients</h1>
          <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 items-center app-mx">
            <p className="text-2xl xs:text-xs">
              DAPP enables patients and caretakers to declutter medical data with an
              easy to operate platfrom for storing and organizing 
              health documents, reports, bills, appointments, follow-ups, insurance, and much more.
            </p>
            <img width="70%" src={patient} alt=""/>
          </div>
        </div>
        <div id="doctor">
          <h1 className="text-5xl app-mx">Doctors</h1>
          <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 items-center app-mx">
            <p className="text-2xl">
              DAPP enables doctors and caretakers to declutter medical data with an
              easy to operate platfrom for storing and organizing
              health documents, reports, bills, appointments, follow-ups, insurance, and much more.
            </p>
            <img width="70%" src={doctor} alt=""/>
          </div>
        </div>
        <div id="pharmacist">
          <h1 className="text-5xl app-mx">Pharmacists</h1>
          <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 items-center app-mx">
            <p className="text-2xl">
              DAPP enables doctors and caretakers to declutter medical data with an
              easy to operate platfrom for storing and organizing
              health documents, reports, bills, appointments, follow-ups, insurance, and much more.
            </p>
            <img width="70%" src={doctor} alt=""/>
          </div>
        </div>
      </div>
      <Signup id="contact">
        <div className="signup-content">
          <h1>Sign up to our beta form</h1>
          <p>
            Sign up to our mailing list to find out more information <br/> and keep up to date about our activities
          </p>
          <div className="sub">
            <input placeholder="email"/>
            <button>Subscribe</button>
          </div>
        </div>
      </Signup>

    </Animated>

  )
}

export default Home