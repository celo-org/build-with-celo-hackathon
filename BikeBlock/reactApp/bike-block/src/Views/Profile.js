import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import {state} from '../Helpers/ContractHelper.js';

import BikeCard from './BikeCard.js';
import './Profile.css';

function Profile(props) {

    let params = useParams();

    const [tokenId,setTokenId] = useState([]);
    const [account,setAccount] = useState(null);

    const [tokenCount,setTokenCount] = useState(null);

    useEffect(() => { 

        if(props.account != null){
            setAccount(props.account)
            getOwnedNFTs(props.account)
        }else{
            setAccount(params.address)
            getOwnedNFTs(params.address);
        }
        
    },[props.ipfs])

    const getOwnedNFTs = async (account) => {

        var tokenIdList = [];
        let rawtokenBalance = await props.bikeBlock.methods.balanceOf(account).call();

        setTokenCount(rawtokenBalance);
        let ownerTokenAmount = props.web3.utils.BN(rawtokenBalance).toString();
        for(var t =0; t <ownerTokenAmount;t++){
            let tokenId = await props.bikeBlock.methods.tokenOfOwnerByIndex(account,t).call();
            let view = <BikeCard
                ipfs = {props.ipfs}
                link = {"/bikes/"+tokenId}
                key = {tokenId}
                bikeBlock = {props.bikeBlock}
                account = {account}
                web3 = {props.web3}
                tokenId = {tokenId}
            />
            tokenIdList.push(view);
        }
        setTokenId(tokenIdList);
    }

    return (
        <div className="container padding-top">
            {tokenCount != null ?
                <div>
                {tokenCount != 0 ?
                    <div className=" row  align-items-center ">
                        {tokenId}
                    </div>
                :
                    <p>No Bike Tokens</p>
                }
                </div>
            :

            <div className="spinner-border" role="status"></div>
            }
        </div>

    )
}

export default Profile;