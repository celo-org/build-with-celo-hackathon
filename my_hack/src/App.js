import React, { useEffect, useState } from 'react';
import DaoAbi from './contracts/DAO.abi.json';
import Erc20Abi from './contracts/IERC20Token.abi.json'
import { getWeb3 } from './utils.js';
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js"
import Loading from './loading';

const ERC20_DECIMALS = 18
const DaoContractAddress = "0x8dd8610292CE79A5BEA1A7253849063e289e22d2"
const cUSDContractAddress = "0x03e4CcA31f8B0264F3587e969771fE9a7f88415f"
let kit

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [admin, setAdmin] = useState(undefined);
  const [shares, setShares] = useState(undefined);
  const [proposals, setProposals] = useState([]);
  const [balance, setBalance] = useState(0)
  const [inputs, setInputs] = useState({
    withdrawAmount: "",
    withdrawTo: "",
    contributeAmount: "",
    redeemAmount: "",
    transferAmount: "",
    transferTo: "",
    proposalName: "",
    proposalAmount: "",
    proposalTo: "",
  });


  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();

      kit = newKitFromWeb3(web3)
      
      const accounts = await kit.web3.eth.getAccounts()
      
      const contract = new kit.web3.eth.Contract(
        DaoAbi, DaoContractAddress
      );

      const balance = await kit.getTotalBalance(accounts[0]);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
        
      const admin = await contract.methods
        .admin()
        .call();

      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
      setAdmin(admin);
      setBalance(USDBalance)
    }
    init();
    window.celo.on('accountsChanged', accounts => {
      setAccounts(accounts);
    });
  }, []);

  const isReady = () => {
    return (
      typeof contract !== 'undefined' 
      && typeof web3 !== 'undefined'
      && typeof accounts !== 'undefined'
      && typeof admin !== 'undefined'
    );
  }

  useEffect(() => {
    // eslint-disable-next-line
    if(isReady()) {
      updateShares();
      updateProposals();
      notificationOff();
    }
    // eslint-disable-next-line
  }, [accounts, contract, web3, admin]);

 
  async function approve(_price) {
    const cUSDContract = new kit.web3.eth.Contract(Erc20Abi, cUSDContractAddress);
    const result = await cUSDContract.methods
      .approve(DaoContractAddress, _price)
      .send({ from: accounts[0] });
    return result
  }

  async function updateShares() {
    const shares = await contract.methods
      .shares(accounts[0])
      .call();
    const _shares = new BigNumber(shares).shiftedBy(-ERC20_DECIMALS).toString()
    setShares(_shares);
  }

  async function updateProposals() {
    const nextProposalId = parseInt(await contract.methods
      .nextProposalId()
      .call());

    const proposals = [];
    for(let i = 0; i < nextProposalId; i++) { 
      const [proposal, hasVoted] = await Promise.all([
        contract.methods.proposals(i).call(),
        contract.methods.votes(accounts[0], i).call()
      ]);
      proposals.push({...proposal, hasVoted});
    }
    setProposals(proposals);
  }

  async function executeProposal(proposalId) {
    notification("Executing Proposal... ⌛"); 
    try {
      await contract.methods
        .executeProposal(proposalId)
        .send({from: accounts[0]});
      notification(`Execution was successful!!! 🎉`);

      await updateProposals();
    } catch (error) {
      notification(`⚠️ ${error}`);
    }
    setTimeout(notificationOff, 3000);
  };

  async function withdrawFunds(e) {
    notification("Withdrawing funds... ⌛");
    e.preventDefault();
    const amount = new BigNumber(e.target.elements[0].value).shiftedBy(ERC20_DECIMALS);
    const to = e.target.elements[1].value;
    try {
      await contract.methods
        .withdrawFunds(amount, to)
        .send({from: accounts[0]});
        notification(`Successful withdrawal!!! 🎉`);

    } catch (error) {
      notification(`⚠️ ${error}`);
    }
    setInputs({
      ...inputs,
      withdrawAmount: "",
      withdrawTo: "",
    });
    setTimeout(notificationOff, 3000);
  };

  async function contribute(e) {
    // Error was being generated from here
    notification("Waiting for payment approval... ⌛")
    e.preventDefault();
    const amount = new BigNumber(e.target.elements[0].value).shiftedBy(ERC20_DECIMALS);
    // Converting the amount from type Bignumber to string
    const _amount = amount.toString();
    // Check user approve transaction or not
    let isApprove = true;
    try {
      await approve(_amount);
    } catch (error) {
      isApprove = false;
      notification(`⚠️ ${error}`)
    }
    if (isApprove){
      notification(`Awaiting Purchase... ⌛`)
      try {
        await contract.methods
          .contribute(_amount)
          .send({ from: accounts[0] });
        notification(`You are now a Shareholder!!! 🎉`);
        await updateShares();
      } catch (error) {
        notification(`⚠️ ${error}`);
      }
      setInputs({
        ...inputs,
        contributeAmount: "",
      });
      setTimeout(notificationOff, 3000);
    }
  };

  async function redeemShares(e) {
    notification(`Redeeming your shares... ⌛`);
    e.preventDefault();
    const amount = new BigNumber(e.target.elements[0].value).shiftedBy(ERC20_DECIMALS);
    try {
      await contract.methods
        .redeemShares(amount)
        .send({from: accounts[0]});
      notification(`Hooray!!! Transaction complete, check your wallet balance! 🎉`);
    
      await updateShares();
    } catch (error) {
      notification(`⚠️ ${error}`);
    }
    setInputs({
      ...inputs,
      redeemAmount: "",
    });
    setTimeout(notificationOff, 3000);
  };

  async function transferShares(e) {
    notification(`Transfering your shares... ⌛`);
    e.preventDefault();
    const amount = new BigNumber(e.target.elements[0].value).shiftedBy(ERC20_DECIMALS);
    const to = e.target.elements[1].value;
    try {
      await contract.methods
        .transferShares(amount, to)
        .send({from: accounts[0]});
        notification(`Transfer complete!!! 🎉`)
      
      await updateShares();
    } catch (error) {
      notification(`⚠️ ${error}`);
    }
    setInputs({
      ...inputs,
      transferAmount: "",
      transferTo: "",
    });
    setTimeout(notificationOff, 3000);
  };

  async function vote(proposalId) {
    notification(`Voting in Progress... ⌛`);
    try {
      await contract.methods
        .vote(proposalId)
        .send({from: accounts[0]});
      notification(`Vote Successful!!! 🎉`);
      
        await updateProposals();
    } catch (error) {
      notification(`⚠️ ${error}`);
    }
    setTimeout(notificationOff, 3000);
  };

  async function createProposal(e) {
    // Another Possible Error
    notification(`Creating your Proposal... ⌛`);
    e.preventDefault();
    const name = e.target.elements[0].value;
    const amount = new BigNumber(e.target.elements[1].value).shiftedBy(ERC20_DECIMALS);
    // Converting the amount to string
    const _amount = amount.toString();
    const recipient = e.target.elements[2].value;

    try {
      await contract.methods
        .createProposal(name, _amount, recipient)
        .send({from: accounts[0]});
      notification(`Proposal Creation Successful!!! 🎉`);

      await updateProposals();
    } catch (error) {
      notification(`⚠️ ${error}`);
    }

    setInputs({
      proposalName: "",
      proposalAmount: "",
      proposalTo: "",
    });
    
    setTimeout(notificationOff, 3000);
  };

  function isFinished(proposal) {
    const now = new Date().getTime();
    const proposalEnd =  new Date(parseInt(proposal.end) * 1000);
    return (proposalEnd > now) > 0 ? false : true;
  }

  function notification(_text) {
    document.querySelector(".alert").style.display = "block"
    document.querySelector("#notification").textContent = _text
  }
  
  function notificationOff() {
    document.querySelector(".alert").style.display = "none"
  }

  function onChange(name, e) {
    setInputs({
      ...inputs,
      [name]: e.target.value,
    });
  }

  if (!isReady()) {
    return <Loading />
    // return <div>Loading...</div>;
  }

  return (
    <div className="container">
      

        <div className="alert alert-warning sticky-top mt-2" style={{zIndex:"5" }} role="alert">
          <span id="notification">Loading...</span>
        </div>

      
      <div style={{backgroundColor: '#98FB98', color: 'w', fontFamily:'algerian'}}><h1 className="text-center">TRI-DAO</h1></div>
      <p>Account: {accounts[0]}</p>
      <p>Shares: {shares}</p>
      <p>Wallet Balance: {balance}</p>

      {accounts[0].toLowerCase() === admin.toLowerCase() ? (
        <>
        <div className="row">
          <div className="col-sm-12">
            <div style={{backgroundColor: '#98FB98', color: 'BLACK'}}><h2 className="text-center">Withdraw Funds</h2></div>
            <form onSubmit={e => withdrawFunds(e)}>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" className="form-control" min={0} id="amount" value={inputs.withdrawAmount} onChange={e => onChange("withdrawAmount", e)} placeholder="Amount to withdraw in JCL" />
              </div>
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input type="text" className="form-control" id="to" value={inputs.withdrawTo} onChange={e => onChange("withdrawTo", e)} />
              </div>
              <button type="submit" className="btn btn-primary" color='yellow'>Submit</button>
            </form>
          </div>
        </div>
       <hr />
       </>
      ) : null}

      <div className="row">
        <div className="col-sm-12">
          <div style={{backgroundColor: '#98FB98', color: 'BLACK'}}><h2 className="text-center">Purchase Shares</h2></div>
          <form onSubmit={e => contribute(e)}>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input type="number" className="form-control" id="amount" min={0} value={inputs.contributeAmount} onChange={e => onChange("contributeAmount", e)} placeholder="Amount to Deposit in JCL"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <hr/>

      <div className="row">
        <div className="col-sm-12">
          <div style={{backgroundColor: '#98FB98', color: 'BLACK'}}><h2 className="text-center">Redeem Shares</h2></div>
          <form onSubmit={e => redeemShares(e)}>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input type="amount" className="form-control" id="amount" min={0} value={inputs.redeemAmount} onChange={e => onChange("redeemAmount", e)}  placeholder="Amount of shares to redeem"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <hr/>

      <div className="row">
        <div className="col-sm-12">
          <div style={{backgroundColor: '#98FB98', color: 'BLACK'}}><h2 className="text-center">Transfer Shares</h2></div>
          <form onSubmit={e => transferShares(e)}>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input type="number" className="form-control" id="amount" min={0} value={inputs.transferAmount} onChange={e => onChange("transferAmount", e)} placeholder="Amount of shares to transfer"/>
            </div>
            <div className="form-group">
              <label htmlFor="to">To</label>
              <input type="text" className="form-control" id="to" value={inputs.transferTo} onChange={e => onChange("transferTo", e)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <hr/>

      <div className="row">
        <div className="col-sm-12">
          <div style={{backgroundColor: '#98FB98', color: 'BLACK'}}><h2 className="text-center">Create Proposal</h2></div>
          <form onSubmit={e => createProposal(e)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" value={inputs.proposalName} onChange={e => onChange("proposalName", e)} />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input type="number" className="form-control" id="amount" min={0} value={inputs.proposalAmount} placeholder="Amount in JCL" onChange={e => onChange("proposalAmount", e)} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient">Recipient</label>
              <input type="text" className="form-control" id="recipient" value={inputs.proposalTo} onChange={e => onChange("proposalTo", e)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      <hr/>

      <div className="row">
        <div className="col-sm-12">
          <div style={{backgroundColor: '#98FB98', color: 'BLACK'}}><h2 className="text-center">Proposals</h2></div>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Recipient</th>
                <th>Votes</th>
                <th>Vote</th>
                <th>Ends on</th>
                <th>Executed</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map(proposal => (
                <tr key={proposal.id}>
                  <td>{proposal.id}</td>
                  <td>{proposal.name}</td>
                  <td>{new BigNumber(proposal.amount).shiftedBy(-ERC20_DECIMALS).toString()} JCL</td>
                  <td>{proposal.recipient}</td>
                  <td>{new BigNumber(proposal.votes).shiftedBy(-ERC20_DECIMALS).toString()}</td>
                  <td>
                    {isFinished(proposal) ? 'Vote finished' : (
                      proposal.hasVoted ? 'You already voted' : ( 
                      <button 
                        onClick={e => vote(proposal.id)}
                        type="submit" 
                        className="btn btn-primary">
                        Vote
                      </button>
                    ))}
                  </td>
                  <td>
                    {(new Date(parseInt(proposal.end) * 1000)).toLocaleString()}
                  </td>
                  <td>
                    {proposal.executed ? 'Yes' : (
                      admin.toLowerCase() === accounts[0].toLowerCase() ? (
                        <button
                          onClick={e => executeProposal(proposal.id).disabled = true}
                          type="submit" 
                          className="btn btn-primary">
                          Execute
                        </button>
                      ) : 'No' 
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
