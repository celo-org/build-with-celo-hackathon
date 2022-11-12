import { useState,useEffect } from "react";
import PieChart from "../components/PieChart";
import TumainDaoAbi from "../components/contractjsonfiles/tumainiDao.json"
import Web3 from "web3";
import { useLocation } from "react-router-dom";

import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js"
let kit;
let contract;

const ProposalCard = (props) => {
  const TumainiDaoContractAddress ="0x325138614778520C4064b7DfD59ffbd4B923a65d"; //"0xC9c5B8a5595c7fB8e7053c3AEcaB369854068650"
  const [useraccount,setUserAccount] = useState(null);
 
  const id = props.id;
  const param = props.param;
  const [noVotes,setNoVotes] = useState(null);
  const [approve,setApprove] = useState(true);
  const [yesVotes,setYesVotes] = useState(null);
  const [toggleVote, setToggleVote] = useState(false);
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
        
                  await votesFor();   
                  await votesReject();          
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
  
  //vote on a proposal
  const vote = async(id,boolean)=>{
    
    try{
      await contract.methods.vote(id,boolean).send({from: kit.defaultAccount});
    }
   catch(error){
    console.log("the error is",error);
   }
  }
  //getAllVoteFor Proposals
const votesFor =async()=>{
  try{

const votes = await contract.methods.getApproveVotes(id).call({from: kit.defaultAccount});

setYesVotes(votes);

console.log("votes re",votes);

  }catch(error){
    console.log("please check",error);
  }
}
//getAllVoteFor Proposals
const votesReject =async()=>{
  try{

const rejectvotes = await contract.methods.getAgainstVotes(id).call({from: kit.defaultAccount});

setNoVotes(rejectvotes);



  }catch(error){
    console.log("please check",error);
  }
}
  useEffect(()=>{
     connectWallet();
     
     
    
  },[]);
 

  const handleToggleVote = () => {
    setToggleVote(!toggleVote);
    
    
    
  };
  return (
    <div className="flex flex-col flex-wrap p-10 bg-white text-gray-900 rounded-lg shadow-lg mt-[100px] mx-2 w-[100%]">
      <div className="flex items-center md:flex-row md:max-w-[1200px] md:w-[100%] font-jost ">
        <div className="md:max-w-[500px] w-[100%]">
          <img
            src={process.env.PUBLIC_URL + "/planting.jpg"}
            alt=""
            className="object-cover max-w-[600px] w-[100%] md:max-w-[600px] md:h-[100%] md:max-h-[500px] rounded-md "
          />
        </div>
        <div className="flex flex-col">
          <div className="md:w-[100%] flex  py-3">
            <div className="h-[400px] px-10 md:w-[100%] flex flex-col ">
              
              <h1 className="font-jost  lg:text-xl md:text-lg sm:text-base lg:pt-10">Donation </h1>
              <h3 className="font-jost text-black lg:text-4xl md:text-2xl sm:text-lg lg:font-bold pt-4">
                {/* Accept Donation to St Lisa school for Girls  */}
                {param}
              </h3>
              <div className="flex flex-col md:flex-row justify-between pt-20">
                <div>
                  <h3>
                    <span className="font-extrabold font-jost lg:text-2xl md:text-lg sm:text-base">
                      Voting Opened
                    </span>
                  </h3>
                </div>
                <div>
                  <button
                    onClick={handleToggleVote}
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-4 px-20 w-full font-open shadow-md "
                  >
                    Vote
                  </button>
                </div>
              </div>
              <div
                style={toggleVote ? { display: "flex" } : { display: "none" }}
                className="flex items-center justify-between"
              >
                <button onClick={()=>{if(approve){
                  vote(id,approve)}
                }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-1 w-[100px] font-work ">
                  Approve
                </button>
                <button  onClick={async()=>{if(approve){
                 
                  vote(id,!approve)}
                }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-1 w-[100px] font-work ">
                  Reject
                </button>
              </div>
              <h4 className="font-jost">1 week remaining</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="max-w-[500px] w-[100%] m-[10px]">
          <h1 className="font-jost text-xl font-bold underline ">Read more information</h1>
          <p className="font-open text-normal pt-10">Water scarcity in Kenya escalates when the dry season kicks in.  In the Mara river basin, water is a precious resource supporting people and nature. Unfortunately, the 395 Kilometers long river faces numerous threats affecting both water quality and the flow,   most of this is caused by human activities and climate change.
Tackling water challenge is the first step out of poverty.  To encourage good water stewardship in the Mara River.</p>
        </div>
        <div className="max-w-[350px] w-[100%]">
          <PieChart yes={yesVotes} no={noVotes}/>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
