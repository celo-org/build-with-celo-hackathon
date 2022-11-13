import React from 'react'
import Navbar from '../layouts/navbar/Navbar'
import About from '../layouts/header/About'
import Fundraisers from '../layouts/fundraisers/Fundraisers'
import Mission from '../layouts/mission/Mission'
import Giving from '../layouts/giving/Giving'
import Footer from '../layouts/footer/Footer'

const Crowdfunding = () => {
  return (
    <>
    <Navbar />
    <About />
    <Fundraisers />
    <Mission />
    <Giving />
    <Footer />
    </>
  )
}

export default Crowdfunding