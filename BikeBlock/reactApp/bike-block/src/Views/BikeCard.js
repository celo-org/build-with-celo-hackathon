import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import {state} from '../Helpers/ContractHelper.js';
import {Buffer} from 'buffer';
import {Link} from "react-router-dom";

import './BikeCard.css';

function BikeCard(props) {

    let params = useParams();

    const [bikeObj,setBikeObj] = useState(null);
    const [bikeState,setBikeState] = useState("");
    const [bikeId,setBikeId] = useState("");
    const [bikeYear,setBikeYear] = useState("");
    const [bikeMake,setBikeMake] = useState("");
    const [bikeColor,setBikeColor] = useState("");
    const [bikeUnique,setBikeUnique] = useState("");
    const [bikeImage,setBikeImages] = useState();

    // Stolen bike states 
    const [stolenObj,setStolenObj] = useState(null);

    const [stolenTime,setStolenTime] = useState(null);
    const [stolenId,setStolenId] = useState(null);
    const [stolenLocation,setStolenLocation] = useState(null);
    const [bountyPayOut,setBountyPayOut] = useState(null);


    const [tokenId,setTokenId] = useState(null);
    const [showOwnerTools,setShowOwnerTools] = useState(true);
    const [isStolen, setIsStolen] = useState(false);
    const decoder = new TextDecoder()

    useEffect(() => {  

        if(props.tokenId != null){
            getNFTData(props.tokenId)   
            setTokenId(props.tokenId)   
        }
    },[props.tokenId,props.account,props.ipfs])

    const getNFTData = async (tokenId) => {
  
        let tokenUri = await props.bikeBlock.methods.tokenURI(tokenId).call();


        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        let stolen = bikeState == 2
 
        let bikeBounty;
        if(stolen){
            bikeBounty = await props.bikeBlock.methods.getStolenInfo(tokenId).call();
            setStolenTime(bikeBounty.time);
            setStolenId(bikeBounty.index);
            setStolenLocation(bikeBounty.location);
            setBountyPayOut(bikeBounty.bountyPayOut)
        }

  
        const stream = props.ipfs._ipfs.cat(tokenUri);

        let data = ""

        for await (const chunk of stream) {
            data += decoder.decode(chunk,{stream: true})
        }

        const bikeObj = JSON.parse(data);
        
        setBikeYear(bikeObj.bikeYear);
        setBikeColor(bikeObj.bikeColor);
        setBikeId(bikeObj.bikeId);
        setBikeMake(bikeObj.bikeMakeModel);
        setBikeUnique(bikeObj.unique);
    

        setIsStolen(stolen)
        setBikeState(state(bikeState));

        let imageBuffers = [];
        let rawImageBuffers = [];
        for (let i = 0; i < bikeObj.images.length; i++) {
            let buffer = [];
            const stream = props.ipfs._ipfs.cat(bikeObj.images[i]);
            for await(const chunk of stream){
                buffer.push(chunk);
            }
      
            const b64 = Buffer.from(buffer[0]).toString('base64');

            rawImageBuffers.push(b64);

            let image =  <img className=" cover " key={i} src={`data:image/png;base64,${b64}`}/>
            imageBuffers.push(image);
        }
        setBikeImages(imageBuffers);

        let obj = {
            id:tokenId,
            state:bikeState,
            info:bikeObj,
            stolen:bikeBounty,
            image:rawImageBuffers,

        }
        setBikeObj(obj);
       
    }


    // TODO MAKE DIFFERENT CARDS
    return (
            <Link 
            to={props.link}
            state = {{bike:bikeObj}}
            >
                <div className=" zero-pad card m-2 col-6 col-sm-3 card-size">
                    <div className="position-absolute w-100 d-flex justify-content-between">
                    <p className="card-text">TokenId: {tokenId}</p>
                    {bountyPayOut ?
                     <p className="card-text">Wanted: {bountyPayOut} cUSD</p>
                    :
                        <p></p>
                    }
                    <p className="card-text">State: {bikeState}</p>
                    </div>
                    {bikeImage}
                    <div className="card-body  ">
                        
                        <p className="card-text">Make model: {bikeMake}</p>
                        <p className="card-text">Year: {bikeYear}</p>
                        <p className="card-text">Color: {bikeColor}</p>
                        <p className="card-text">Unique Characteristics : {bikeUnique}</p>
                        
                    </div>
                </div>
            </Link>
    )
}

export default BikeCard;