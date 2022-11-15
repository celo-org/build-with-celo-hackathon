import React from 'react'
import Footer from './Footer'
import Header from './Header'

const CompanyLayout = ({children}) => {
  return (
    <>
        <Header />

        {children}

    
    </>
  )
}

export default CompanyLayout