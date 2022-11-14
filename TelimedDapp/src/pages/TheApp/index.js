import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Animated } from 'react-animated-css'
import { Button, Container } from 'react-bootstrap'
import TransactionHistoryTable from './TransactionHistoryTable'
import FormModal from './FormModal'
import { StyleSheet, css } from 'aphrodite'
import  { DOCTOR, PHARMACIST, INSURER } from "../../constants"
import connectImage from "../../assets/img/connect.svg"
import PaginatedItems from './PaginateItems'

const styles = StyleSheet.create({
  btn: {
    margin: '0 10px'
  },
  empty: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
  },
  emptyText: {
    textAlign: "center"
  }
})

const TheApp = () => {
  let location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {setShowModal(false)}
  const accountAddress = localStorage.getItem("address")
  console.log(accountAddress)
  const transactions = localStorage.getItem("transactions")

  const doctor = DOCTOR
  const pharmacist = PHARMACIST
  const insurer = INSURER

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

  // var time = new Date().getTime(); // get your number
  var date = new Date(1661025737);
  console.log(  date.toDateString())

  return (
    <Container>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
      <div className="min-height">

        <div>
          {    
             accountAddress === doctor ?
            <Button className={css(styles.btn)} variant="info" onClick={() => setShowModal(true)}>
            Doctor
           </Button> : accountAddress === pharmacist ?
            <Button className={css(styles.btn)} onClick={() => setShowModal(true)}>
            Pharmacist
            </Button> : accountAddress === insurer ?
            <Button className={css(styles.btn)} variant="success" onClick={() => setShowModal(true)}>
              Insurer
            </Button> :  accountAddress  ?
            <div>
              <Button className={css(styles.btn)} variant="warning" onClick={() => setShowModal(true)}>
              Patient
            </Button> 
            </div>
           : <div></div> 
          }
      
          {(showModal  && accountAddress !== doctor )  && (showModal  && accountAddress !== pharmacist ) && (showModal  && accountAddress !== insurer ) ?  
          <FormModal show={showModal} buttonText="Consult a doctor" onHide= {() => handleClose()} /> :
          <FormModal show={showModal} buttonText="Submit" onHide= {() => handleClose()} />    
          }   

        </div>
        {accountAddress === null ? 
          <div>
            <img className={css(styles.empty)} src={connectImage} alt="connect" /> 
            <h3 className={css(styles.emptyText)}>Please connect your wallet to get started</h3>
          </div> 
            :
            <div id="container">
              {/* <TransactionHistoryTable/>  */}
              {/* <PaginatedItems currentItems={2}/> */}
            </div>
        }
      </div>
    </Animated>
    </Container>
  )
}

export default TheApp