import RehemaContractAbi from "../components/contractjsonfiles/RehemaToken.json";
import JoinCommunityAbi  from "../components/contractjsonfiles/joinCommunity.json";
import { newKitFromWeb3 } from "@celo/contractkit";
import { useState,useEffect } from "react";
import Web3 from "web3";


let kit ;
let contract;
let contractAcivate;
const MintToken = () => {
  const JointContractAddress = "0x1Fa1910059baC5CB065F71fAE4C383E1488dd4f2"//"0x75769b9E326D5E40650c9C1446d0920789f4e5Fe"//"0xe58f4213486fe3bA22F8d7D45ADF85C2107CAe1d";
  const RehemaContract = "0x89f6bB154E83D942a0A97147433A2356031fd6Ce";
  const [useraccount,setUserAccount] = useState(null);
  const [rehemaamount,setRehemaAmount] = useState(null);
  const [totalsup,settotalsup] = useState(null);
  const mintRehemaTokens =async(amount)=>{
    try{
      await contract.methods.mintToken(amount,JointContractAddress).send({from : kit.defaultAccount});

    }catch(error){
      alert("ronex error")
    }
    
  }
  const checkbalance = async ()=>{
    const total = await contract.methods.totalSupply().call({from : kit.defaultAccount});
settotalsup(total);

  }
  const handleAddProperty = (e) => {
    //prevent page refresh
    e.preventDefault();
    setRehemaAmount("");

}


  const connectWallet  =  async function (){
   
      if (window.celo) {
        
        try {
          await window.celo.enable()
         
    
          const web3 = new Web3(window.celo);
          kit = newKitFromWeb3(web3);
    
          const accounts = await kit.web3.eth.getAccounts();
          kit.defaultAccount = accounts[0];
         
          contract = new kit.web3.eth.Contract(RehemaContractAbi,RehemaContract);
    
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
    useEffect(()=>{
      connectWallet();
      checkbalance();
      
    },[])

  return (
    <div className="flex justify-around ">
      <div className="flex flex-col mt-[10px]">
        <form onSubmit={handleAddProperty}>
          <label className="text-xl m-5">Mint Tokens</label>
          <input
            className="max-w-[600px] w-[100%] border-2 border-slate-800 p-2 rounded m-5"
            type="number"
            onChange={(e)=>setRehemaAmount(e.target.value)} 
            placeholder="Enter Number of Tokens to Mint.."
          />
            <button onClick={()=>{checkbalance()}} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open m-5">
            Check Balance
          </button>
          <button onClick={()=>{mintRehemaTokens(rehemaamount)}}  className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-bold leading-none text-white focus:outline-none bg-blue-500 border rounded hover:bg-blue-600 py-3 px-5 w-[200px] font-open m-5">
            only Admin Mint
          </button>
        </form>
      <h2> Available Rehema Tokens in Supply :{totalsup}</h2>
      </div>
    </div>
  );
};

export default MintToken;
