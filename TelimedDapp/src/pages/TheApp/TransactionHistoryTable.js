import React, { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { StyleSheet, css } from 'aphrodite'
import { Buffer } from 'buffer';
import axios from "axios"
import emptyImage from "../../assets/img/empty.svg"

const styles = StyleSheet.create({
  table: {
    '@media (max-width: 575px)': {
      fontSize: '12px',
    }
  },
  title: {
    margin: '20px 0'
  },
  empty: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%'
  },
})

export default function TransactionHistoryTable({currentItems}) {
  // const url = "https://indexer.testnet.algoexplorerapi.io/v2/transactions?limit=50&address=IQ7UESMB2RHOGCBXJP5S3KZUDLTSGSTKLPSS4DDFZHVXNYAZRBFYV4EWRM&sort=desc"
  const url = "https://indexer.testnet.algoexplorerapi.io/v2/transactions?limit=50&address="
  const address = localStorage.getItem("address")
  const [transactions, setTransactions] = useState([])  

  const getTransactionHistory = async () => {
   const response = await axios.get(`${url}${address}&sort=desc`)
   const data = response.data.transactions
   setTransactions(data)
   localStorage.setItem("transactions", data)
  }

  const base64ToString =(str) =>{
    if(str == null){
      return
    }else {
      return Buffer.from(str, 'base64').toString('ascii');
    }  
  }

  useEffect(() =>{
    getTransactionHistory()
  }, [])

  return(
      <div>
         <h4 className={css(styles.title)}>Transaction History</h4>
        { transactions.length < 1 ? <img className={css(styles.empty)} src={emptyImage} width="50px" alt="empty" /> :
         <div class="table-responsive">
          <Table className={css(styles.table)} striped bordered hover  size="sm">
            <thead>
              <tr>
                <th>TxId</th>
                <th>Confirmed Round</th>
                <th>Mesage</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              
            {transactions.map((txn, index) =>
              txn.hasOwnProperty('inner-txns') ?
              txn['inner-txns'].map(item => {
                if (item.hasOwnProperty('payment-transaction')) {
                  return <tr key={index}  className={css(styles.table)}>
                  <td> <a href={`https://testnet.algoexplorer.io/tx/${txn.id}`} target="_blank" rel="noreferrer">{txn.id === null ? null : `${txn.id.substring(0,40)}...`}</a></td>
                  <td>{txn['confirmed-round']}</td>
                  <td>{base64ToString(txn.note)}</td>
                  <td>{txn.sender === null ? null : `${txn.sender.substring(0,20)}...`}</td>    
                  <td>{item['payment-transaction']['receiver'] === null ? null 
                  : `${item['payment-transaction']['receiver'].substring(0,20)}...`}</td>          
                  </tr> 
                } else {
                  return null
                }
              }) : null
                           
            )}
            </tbody>
          </Table>
         </div>
         }
      </div>
      
  )
}