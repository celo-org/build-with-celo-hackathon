import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import {state} from '../Helpers/ContractHelper.js';
import BikeCard from "./BikeCard.js";

function Bike(props) {

    let params = useParams();

    const [bikeState,setBikeState] = useState("");
    const [tokenId,setTokenId] = useState(null);
    const [tokenCount,setTokenCount] = useState(0);

    useEffect(() => { 
        setTokenId(params.id);
        getToken(params.id);
        
    },[props.account])

    const getToken = async (tokenId) => {
        
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        setBikeState(bikeState);
        if(bikeState == 0){ return}
        let tokenUri = await props.bikeBlock.methods.tokenURI(tokenId).call();
        let tokenState = props.web3.utils.BN(bikeState).toString();

        setBikeState(state(tokenState));
    }
    

    return (
        <div>
        { bikeState != 0 ?
            <BikeCard
            key = {params.id}
            bikeBlock = {props.bikeBlock}
            web3 = {props.web3}
            account = {props.account}
            tokenId = {params.id}
            />
            :
            <p>No Bikes Exist</p>
        }
        </div>
        
    )

}

export default Bike;