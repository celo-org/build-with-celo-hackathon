import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';

import {state} from '../Helpers/ContractHelper.js';

function BikeCard(props) {

    let params = useParams();

    const [bikeState,setBikeState] = useState("");
    const [tokenId,setTokenId] = useState(null);
    const [showOwnerTools,setShowOwnerTools] = useState(true);

    useEffect(() => {  
        if(props.tokenId != null){
            getNFTData(props.tokenId)   
            setTokenId(props.tokenId)
            
        }
    },[props.tokenId,props.account])

    const getNFTData = async (tokenId) => {
        let tokenUri = await props.bikeBlock.methods.tokenURI(tokenId).call();
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        setBikeState(state(bikeState));
        console.log(tokenUri);
    }

    const reportStolen = async (tokenId) => {
        const stolenLocation = {"lat":30,"long":40};
        const time = Date.now() / 1000;

        let tx = await props.bikeBlock.methods.setStolenBike(tokenId,time,stolenLocation,0).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
    
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        let tokenState = props.web3.utils.BN(bikeState).toString();
        setBikeState(state(tokenState));
    }

    return (
        <div>
            <div className="card m-2">
                <img className="card-img-top" src="#" alt="Card image cap"/>
                <div className="card-body">
                    <h2 className="card-text">Bike Card</h2>
                    <p className="card-text">Images</p>
                    <p className="card-text">TokenId: {tokenId}</p>
                    <p className="card-text">Bike State: {bikeState}</p>
                    <p className="card-text">Make model</p>
                    <p className="card-text">Color</p>
                    <p className="card-text">Unique Characteristics</p>
                    {showOwnerTools ? 
                    <div>
                    <h3>Owner Tools</h3>
                    <button onClick={() => reportStolen(tokenId)}>Report Stolen</button>
                    </div>
                    :

                        <div></div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default BikeCard;