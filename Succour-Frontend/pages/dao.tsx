
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import AboutUs from '../components/header/AboutUs'
import Projects from '../components/project/Projects'
import CampaignPage from '../components/campaign/Campaign'
import Mission from '../components/mission/Mission'
import Footer from '../components/footer/Footer'

const dao = () => {
     return (
          <div>
               <Navbar />
               <AboutUs />
               <Projects />
               <CampaignPage />
               <Mission />
               <Footer />
          </div>
     )
}

export default dao