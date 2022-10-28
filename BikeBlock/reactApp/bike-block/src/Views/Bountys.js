
import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';

import SideCard from './Cards/SideCard';

import BikeCard from './BikeCard.js';

import "./Bountys.css"


function Bountys(props) {

    const [bountyCount,setBountyCount] = useState(0);
    const [views,setViews] = useState([]);
    const [serialNumber,setSerialNumber] = useState("");
    const [bikeLocation,setBikeLocation] = useState("");
    const [bikeTime,setBikeTime] = useState("");
    const [otherDetails,setOtherDetails] = useState("");


    useEffect(() => {  
        getStolenBikes()
    },[])

    const getStolenBikes = async () => {
        let bikeCount = await props.bikeBlock.methods.getStolenBikeCount().call();
        setBountyCount(bikeCount);
        let bikes = await props.bikeBlock.methods.getStolenBikeAtIndex(0,bikeCount).call();
        var preLoad = []
        for(var c = 0; c < bikes.length;c++){

            let view = <BikeCard
                ipfs = {props.ipfs}
                link = {"/bountys/"+bikes[c]}
                key = {bikes[c]}
                bikeBlock = {props.bikeBlock}
                account = {props.account}
                web3 = {props.web3}
                tokenId = {bikes[c]}
            />
            preLoad.push(view);
        }
        setViews(preLoad);
    }




    return (
        <div className="container d-flex justify-content-center padding-top">
            <div  className=" row  align-items-center ">
                {views}
                <p>Bountys {bountyCount}</p>
            </div>
        </div>
    )

}

export default Bountys;