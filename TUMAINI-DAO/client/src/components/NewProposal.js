import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { newKitFromWeb3 } from "@celo/contractkit";
import { useState,useEffect } from "react";
import TumainDaoAbi from "../components/contractjsonfiles/tumainiDao.json"
import Web3 from "web3";
import BigNumber from "bignumber.js"
const ERC20_DECIMALS = 18
let kit;
let contract;
const NewProposal = () => {
  const cUSDContract = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
  const TumainiDaoContractAddress ="0x325138614778520C4064b7DfD59ffbd4B923a65d"; //"0xC9c5B8a5595c7fB8e7053c3AEcaB369854068650"
    const { showModal, setShowModal } = useContext(AppContext);
    const [useraccount,setUserAccount] = useState(null);
    //proposal details
    const [proposaldescription,setProposalDescription] = useState(null);
  const [charityAddress,setCharityAddress] = useState(null);
  const [proposalAmount,setProposalAmount] = useState(null);
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
   //write to the dao
   const writeProposal = async ()=>{
    const params =[
      proposaldescription,
      charityAddress,
      new BigNumber(proposalAmount)
      .shiftedBy(ERC20_DECIMALS)
    ]
    try{
      await contract.methods.createProposal(...params).send({from : kit.defaultAccount});
      notification(`proposal to "${params[1]}" was successful`);

    }catch(error){
      notification(error);
    }
   }
    //onpage reload
    useEffect(()=>{
      connectWallet();
    },[]);
    

    const handleShowModal = ()=>{
        setShowModal(!showModal)
    }
//handel on submit
const handleAddProposal = (e) => {
  //prevent page refresh
  e.preventDefault();
  


}

  return (
    <div className=" w-3/6 bg-white rounded-lg absolute top-[80px]  text-slate-800 font-work h-[80%] shadow-lg">
      <form onSubmit={handleAddProposal} className="flex flex-col justify-around mx-auto w-[100%] px-10 mt-16  h-[80%] ">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-jost font-bold">New Proposal</h1>
        <h3 onClick={handleShowModal} className="text-red-500 font-jost border border-red-500 rounded-md px-4 py-2 cursor-pointer hover:font-bold hover:border-2">Close</h3>
        </div>
        <div className="flex flex-col gap-6">
        <div>
          <label className="xl:text-lg lg:text-lg md:text-base sm:text-normal font-jost font-bold ">Proposer</label>
          <h4 className="text-gray-500">{useraccount}</h4>
        </div>
        <div className="flex flex-col mt-[10px]">
          <label className="xl:text-lg lg:text-lg md:text-base sm:text-normal font-jost font-bold">Proposal Title</label>
          <input
            className="w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            placeholder="Proposal Title"
            required
          />
        </div>
        <div className="flex flex-col mt-[10px]">
          <label className="xl:text-lg lg:text-lg md:text-base sm:text-normal font-jost font-bold">Proposal Description</label>
          <input
            className=" w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            name="description"
            id=""
            placeholder="Proposal Description"            
            required
               onChange={(e)=>{setProposalDescription(e.target.value)}}
               value={proposaldescription}
          />
        </div>
        <div className="flex flex-col mt-[10px]">
          <label className="xl:text-lg lg:text-lg md:text-base sm:text-normal font-jost font-bold">Target Address</label>
          <input
            className=" w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            name="address"
            id=""
            placeholder="0xC877733b1.....e56FF851fa"
            required
            onChange={(e)=>{setCharityAddress(e.target.value)}}
               value={charityAddress}
          />
        </div>
        <div className="flex flex-col mt-[10px]">
          {" "}
          <label className="xl:text-lg lg:text-lg md:text-base sm:text-normal font-jost font-bold">Value</label>
          <input
            className="w-[100%] border-2 border-slate-800 p-2 rounded"
            type="text"
            name="value"
            id=""
            placeholder="Value"
            required
            onChange={(e)=>{setProposalAmount(e.target.value)}}
               value={proposalAmount}
          />
        </div>

        </div>
        
        <input onClick={()=>{writeProposal()}} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open my-2 shadow-lg" type="submit" name="Send Transcation" />
      </form>
    </div>
  );
};

export default NewProposal;
