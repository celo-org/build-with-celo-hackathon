
import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';

import SideCard from './Cards/SideCard';


function Bountys(props) {

    const [bountyCount,setBountyCount] = useState(0);
    const [views,setViews] = useState([]);

    useEffect(() => {  
        getStolenBikes()
    },[])

    const getStolenBikes = async () => {
        let bikeCount = await props.bikeBlock.methods.getStolenBikeCount().call();
        setBountyCount(bikeCount);
        let bikes = await props.bikeBlock.methods.getStolenBikeAtIndex(0,bikeCount).call();
        var preLoad = []
        for(var c = 0; c < bikes.length;c++){
            let card = <SideCard
                            key = {c}
                            bikeBlock = {props.bikeBlock}
                            web3 = {props.web3}
                            account = {props.account}
                            tokenId = {bikes[c]}
                        />
            preLoad.push(card);
        }
        setViews(preLoad);
    }

    return (
        <div >
            
            {views}
            <p>Bountys {bountyCount}</p>
        </div>
    )

}

export default Bountys;