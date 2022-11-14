import React, {useRef, useState} from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'
import { DOCTOR, PHARMACIST, INSURER } from "../../constants"

export default function FormModal(props){
  const userAccount = useRef()
  
  const [message, setMessage] = useState("")
  const [walletAddress, setWalletAddrss] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [errorAddress, setErrorAddress] = useState("")
  const [amount, setAmount] = useState(0)

  const accountAddress = localStorage.getItem("address")
  console.log(accountAddress)


const styles = StyleSheet.create({
  error: {
    color: 'red'
  }
})

 const  handleMessageChange =(e) => {
    setMessage(e.target.value);
    console.log(e.target.value)
 }

 const handleWalletAddressChange =(e) => {
  setWalletAddrss(e.target.value);
  console.log(e.target.value)
}

const handleAmountChange = e =>{
  setAmount(e.target.value)
  console.log(amount)
}

  const handleTransfer = async () => {
  //  const appOptin = await optin(getAddress)
  //    console.log(appOptin)
    if(message === "") {
      setErrorMessage("Fields cannot be empty")
      return
    }
    if(walletAddress === ""){
      setErrorMessage("Fields cannot be empty")
    }
    if( walletAddress.length < 32){
      setErrorAddress("Address should not be less than 32 characters")
    }
    else if(message !=="" || walletAddress.length === 32){
      setErrorMessage("")
      setErrorAddress("")
      if (accountAddress === INSURER) {
        // contract call code here
      }else{
        // contract call code here
      }
      props.onHide()
      // console.log(callApp)
    }
  }

  return (
    <>
    <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>General Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="message"
                autoFocus
                onChange={handleMessageChange}
                value={message}
                required
              />
              <label className={css(styles.error)}>{errorMessage}</label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Recipient Wallet Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Receipient Address"
                autoFocus
                onChange={handleWalletAddressChange}
                value = {walletAddress}
                required
              />
              <label className={css(styles.error)}>{errorAddress}</label>
            </Form.Group>
            { accountAddress === INSURER ? <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="amount"
                autoFocus
                onChange={handleAmountChange}
                value = {amount}
                required
              />
            </Form.Group> : null}
            

            <Button variant="primary" onClick={handleTransfer}>
            {props.buttonText}
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
     
        </Modal.Footer>
      </Modal>
    </>
  )
}