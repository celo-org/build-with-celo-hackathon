import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import {state} from '../Helpers/ContractHelper.js';

import BikeCard from './BikeCard.js';

function Profile(props) {

    let params = useParams();

    const [bikeState,setBikeState] = useState("");
    const [tokenId,setTokenId] = useState([]);
    const [account,setAccount] = useState(null);
    


    useEffect(() => { 
    
        if(props.account != null){
            setAccount(props.account)
            getOwnedNFTs(props.account)
        }else{
            console.log(params.address);
            setAccount(params.address)
            getOwnedNFTs(params.address);
        }
        
    },[])

    const getOwnedNFTs = async (account) => {
        var tokenIdList = [];
        let rawtokenBalance = await props.bikeBlock.methods.balanceOf(account).call();
        let ownerTokenAmount = props.web3.utils.BN(rawtokenBalance).toString();
        for(var t =0; t <ownerTokenAmount;t++){
            console.log("Getting tokenId"+t);
            let tokenId = await props.bikeBlock.methods.tokenOfOwnerByIndex(account,0).call();
            let view = <BikeCard
                key = {tokenId}
                bikeBlock = {props.bikeBlock}
                account = {account}
                web3 = {props.web3}
                tokenId = {tokenId}
            />
            tokenIdList.push(view);
            //setTokenId(tokenId);
        }
        setTokenId(tokenIdList);
    }



    return (
        <div>
            {tokenId}
        </div>
    )
}

export default Profile;