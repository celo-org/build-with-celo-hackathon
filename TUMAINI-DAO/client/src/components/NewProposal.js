import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { newKitFromWeb3 } from "@celo/contractkit";
import { useState,useEffect } from "react";
import Web3 from "web3";
let kit;
let contract;
const NewProposal = () => {
    const { showModal, setShowModal } = useContext(AppContext);
    const [useraccount,setUserAccount] = useState(null);
    const connectWallet  =  async function (){
   
      if (window.celo) {
        
        try {
          await window.celo.enable()
         
    
          const web3 = new Web3(window.celo);
          kit = newKitFromWeb3(web3);
    
          const accounts = await kit.web3.eth.getAccounts();
          kit.defaultAccount = accounts[0];
          setUserAccount(kit.defaultAccount);
          
    
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
    //onpage reload
    useEffect(()=>{
      connectWallet();
    },[]);
    

    const handleShowModal = ()=>{
        setShowModal(!showModal)
    }


  return (
    <div className="max-w-[700px] w-[100%] bg-white rounded-lg absolute top-[80px]  text-slate-800 font-work max-h-[1300px] h-[100%] shadow-lg">
      <form className="flex flex-col justify-around max-w-[650px] w-[100%] p-3 max-h-[900px] h-[100%]">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl">New Proposal</h1>
        <h3 onClick={handleShowModal} className="text-red-400">close</h3>
        </div>
        <div>
          <label className="text-xl">proposer</label>
          <h4 className="">{useraccount}</h4>
        </div>
        <div className="flex flex-col mt-[10px]">
          <label className="text-xl">Proposal Title</label>
          <input
            className="max-w-[600px] w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            placeholder="Proposal Title"
          />
        </div>
        <div className="flex flex-col mt-[10px]">
          <label className="text-xl">Proposal Description</label>
          <input
            className="max-w-[600px] w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            name="description"
            id=""
            placeholder="Proposal Description"
          />
        </div>
        <div className="flex flex-col mt-[10px]">
          <label className="text-xl">Target Address</label>
          <input
            className="max-w-[600px] w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            name="address"
            id=""
            placeholder="Target Address"
          />
        </div>
        <div className="flex flex-col mt-[10px]">
          {" "}
          <label className="text-xl">Value</label>
          <input
            className="max-w-[600px] w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            name="value"
            id=""
            placeholder="Value"
          />
        </div>
        <input className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open my-2" type="submit" name="Send Transcation" />
      </form>
    </div>
  );
};

export default NewProposal;
