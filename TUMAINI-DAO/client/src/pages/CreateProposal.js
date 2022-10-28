import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import TumainDaoAbi from "../components/contractjsonfiles/tumainiDao.json"
import Web3 from "web3";
import BigNumber from "bignumber.js"
import { newKitFromWeb3 } from "@celo/contractkit";
import { useState,useEffect } from "react";
import erc20 from "../components/contractjsonfiles/erc20.json";
let kit;
let contract;

const CreateProposal = () => {
  const cUSDContract = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
  const TumainiDaoContractAddress ="0x325138614778520C4064b7DfD59ffbd4B923a65d"; //"0xC9c5B8a5595c7fB8e7053c3AEcaB369854068650"
  const { showModal, setShowModal } = useContext(AppContext);
  const [useraccount,setUserAccount] = useState(null);
  //proposal details
  
    const connectWallet  =  async function (){
   
      if (window.celo) {
        
        try {
          await window.celo.enable()
         
    
          const web3 = new Web3(window.celo);
          kit = newKitFromWeb3(web3);
    
          const accounts = await kit.web3.eth.getAccounts();
          kit.defaultAccount = accounts[0];
          setUserAccount(kit.defaultAccount);
          contract = new kit.web3.eth.Contract(TumainDaoAbi,TumainiDaoContractAddress);
          
    
        } catch (error) {
          notification(`⚠️ ${error}.`)
        }
      } else {
        notification("⚠️ Please install the CeloExtensionWallet.")
      }
    }
    const notification =(text) =>{
      alert(text)
    }
   //make Stakeholder Function in order to make proposals
   const makeStakeHolder = async ()=>{
    try{
      const cusdContract = new  kit.web3.eth.Contract(erc20,cUSDContract);
     const amount = await contract.methods.getamountsend().call({from : kit.defaultAccount});
     await cusdContract.methods.approve(TumainiDaoContractAddress,amount).send({from : kit.defaultAccount});
      await contract.methods.makeStakeholder().send({from: kit.defaultAccount,value : new BigNumber(1)});

    }catch(error){
      notification(error);
    }
  }

  const handleShowModal = ()=>{
      setShowModal(!showModal);
  }
  //onpage reload
  useEffect(()=>{
    connectWallet();
  },[]);
  return (
    <div className="flex flex-col items-start mt-[30px] bg-white max-w-[700px] w-[100%] md:h-[120px] h-[100%] rounded-lg mt-[80px]">
      <h1 className="font-work text-3xl m-2 text-slate-800">
        Create a New Proposal
      </h1>
      <button onClick={()=>{handleShowModal();makeStakeHolder()}} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open m-2">
        New Proposal
      </button>
    </div>
  );
};

export default CreateProposal;
