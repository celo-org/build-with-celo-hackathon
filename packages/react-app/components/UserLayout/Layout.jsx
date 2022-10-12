import React from 'react'
import Footer from './Footer'
import Header from './Header'

const UserLayout = ({children}) => {
  return (
    <>
        <Header />

        {children}

    
    </>
  )
}

export default UserLayout