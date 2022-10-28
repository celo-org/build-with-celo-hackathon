import { useNavigate } from "react-router-dom";
import TumainDaoAbi from "../components/contractjsonfiles/tumainiDao.json"
import Web3 from "web3";
import { useState,useEffect,useCallback } from "react";
import { newKitFromWeb3 } from "@celo/contractkit";
import ProposalsTemplate from "./ProposalsTemplate"
import BigNumber from "bignumber.js"
let kit;
let contract;

const Proposal = () => {
  const TumainiDaoContractAddress ="0x325138614778520C4064b7DfD59ffbd4B923a65d"; //"0xC9c5B8a5595c7fB8e7053c3AEcaB369854068650"
  const [useraccount,setUserAccount] = useState(null);
  const [proposal,setProposal] = useState([]);
    const navigate = useNavigate("/proposal");
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
    //get all proposals
    const getAllProposals =  useCallback(  async ()=>{
      try{
       
        let alls=[]
        
          const propsals = await contract.methods.getAllProposals().call({from : kit.defaultAccount})
         //notification(propsals)
         propsals.forEach((element) => {
          alls.push(element)
          
         });
         setProposal(alls);

       
       
      }catch(error){
        console.log(error)
      }
    },[contract])
    

    const handleViewProposal = ()=>{
        navigate("/proposal_page")
    }
     //onpage reload
     useEffect(()=>{
      connectWallet();
      
    },[]);
    useEffect(()=>{
      getAllProposals();
    },[useraccount]);
  return (
   <ProposalsTemplate  proposal={proposal}/>
   
      

      
   
   
  );
};

export default Proposal;
