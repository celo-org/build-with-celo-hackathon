import { useState, useEffect } from 'react'
import { AppFooter } from './Footer.styles'

const Footer = () => {
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <AppFooter>
      <small>
        &copy; {year} Whichride - All rights reserved.
      </small>
      <small>
        <span>Privacy Policy</span>
        <span className="tnc">Terms and Conditions</span>
      </small>
    </AppFooter>
  )
}

export default Footer