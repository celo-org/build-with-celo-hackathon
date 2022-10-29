import React, {Component} from 'react';


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Profile from './Views/Profile.js';
import Bike from './Views/Bike.js';

import Bountys from './Views/Bountys.js';
import Main from './components/Main.js';
import NaviView from './components/NaviView.js';
import Report from './Views/Report.js';

import { BikeBlockAbi, BikeBlockAddress} from './Contract.js'
import Web3 from 'web3';
import FullReport from './Views/FullReport.js';
//import Navbar from './components/Navbar.js';
//import * as IPFS from 'ipfs-core';

class App extends Component {
  
  constructor(props) {
    super(props)

    console.log(props.ipfs._ipfs);
    
    // inject web3 provider
    const web3 = new Web3(window.ethereum);
    //const web3 = new Web3("https://alfajores-forno.celo-testnet.org")
    // init daoManager contract
    const bikeBlock = new web3.eth.Contract(BikeBlockAbi,BikeBlockAddress);

    this.state = {
      web3:web3,
      bikeBlock:bikeBlock,
      account:null,
      askForAccount:false,
      ipfs:null
    }

    this.loadAccount = this.loadAccount.bind(this);


  }

  componentWillMount() {

    this.setState({ipfs:this.props.ipfs});
    // Load data

    //this.stateNode().then((ipfs) => {
    //  this.setState({ipfs:ipfs})
    //})
  }



  async loadAccount() {
    // load accounts from window
    if (window.ethereum) {

        try {
          let accounts;
          let account = await this.state.web3.eth.requestAccounts();
          accounts = account[0]

          this.setState({ account: accounts})

        } catch (error) {
          console.log(error);
          if (error.code === 4001) {
            // User rejected request
          }

        }
      }
  }
  

  render() {
    return (
      <div>        
        <BrowserRouter>

        <NaviView 
                account = {this.state.account}
                loadAccount = {this.loadAccount}
          />


          <Routes>
            <Route path="/" element={
              <Main
                bikeBlock = {this.state.bikeBlock}
                web3 = {this.state.web3}
                account = {this.state.account}
                ipfs = {this.props.ipfs}
              />
            }>
            </Route>


            <Route path="/profile/:address" element={
              <Profile
                bikeBlock = {this.state.bikeBlock}
                ipfs = {this.props.ipfs}
                web3 = {this.state.web3}
                account = {this.state.account}
              />
            }>
            </Route>

            <Route path="/bikes" element={
              <Main/>
            }>
            </Route>

            <Route path="/bikes/:id" element={
              <Bike
                bikeBlock = {this.state.bikeBlock}
                web3 = {this.state.web3}
                account = {this.state.account}
              />
            }>
            </Route>

            <Route path="/bountys" element={
              <Bountys
                bikeBlock = {this.state.bikeBlock}
                web3 = {this.state.web3}
                account = {this.state.account}
                ipfs = {this.props.ipfs}
              />
            }>
            </Route>

            <Route path="/reports/:id" element={
              <Report
              bikeBlock = {this.state.bikeBlock}
              web3 = {this.state.web3}
              account = {this.state.account}
              />
            }>
            </Route>

            <Route path="/reports/:id/:reportId" element={
              <FullReport
              bikeBlock = {this.state.bikeBlock}
              web3 = {this.state.web3}
              account = {this.state.account}
              />
            }>
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    )
  }

}


export default App;
