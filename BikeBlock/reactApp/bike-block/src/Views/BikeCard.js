import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import {state} from '../Helpers/ContractHelper.js';
import {Buffer} from 'buffer';

function BikeCard(props) {

    let params = useParams();

    const [bikeState,setBikeState] = useState("");
    const [bikeId,setBikeId] = useState("");
    const [bikeYear,setBikeYear] = useState("");
    const [bikeMake,setBikeMake] = useState("");
    const [bikeColor,setBikeColor] = useState("");
    const [bikeUnique,setBikeUnique] = useState("");


    const [bikeImage,setBikeImages] = useState();


    const [tokenId,setTokenId] = useState(null);
    const [showOwnerTools,setShowOwnerTools] = useState(true);

    const decoder = new TextDecoder()

    useEffect(() => {  
        if(props.tokenId != null){
            getNFTData(props.tokenId)   
            setTokenId(props.tokenId)
            
        }
    },[props.tokenId,props.account])

    const getNFTData = async (tokenId) => {
        let tokenUri = await props.bikeBlock.methods.tokenURI(tokenId).call();
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        console.log(props.ipfs);
        const stream = props.ipfs._ipfs.cat(tokenUri);
        console.log(tokenUri);
        let data = ""

        for await (const chunk of stream) {
            data += decoder.decode(chunk,{stream: true})
        }

        const bikeObj = JSON.parse(data);
        setBikeYear(bikeObj.bikeYear);
        setBikeColor(bikeObj.bikeColor);
        setBikeId(bikeObj.bikeId);
        setBikeMake(bikeObj.bikeMokeModel);
        setBikeUnique(bikeObj.unique);
        setBikeState(state(bikeState));

        let imageBuffers = [];
        for (let i = 0; i < bikeObj.images.length; i++) {
            let buffer = [];
            const stream = props.ipfs._ipfs.cat(bikeObj.images[i]);
            for await(const chunk of stream){
                buffer.push(chunk);
                //buffer += decoder.decode(chunk,{stream:true})
            }
            //let value = Buffer.from(buffer).toString('base64');
            console.log(buffer);
            const b64 = Buffer.from(buffer[0]).toString('base64');
            let image =  <img key={i} src={`data:image/png;base64,${b64}`}/>
            imageBuffers.push(image);
            //buffer = "";
        }
        setBikeImages(imageBuffers);
       
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
                {bikeImage}
                <div className="card-body">
                    <h2 className="card-text">Bike Card</h2>
                    <p className="card-text">Images</p>
                    <p className="card-text">TokenId: {tokenId}</p>
                    <p className="card-text">Bike State: {bikeState}</p>
                    <p className="card-text">Make model: {bikeMake}</p>
                    <p className="card-text">Year: {bikeYear}</p>
                    <p className="card-text">Color: {bikeColor}</p>
                    <p className="card-text">Unique Characteristics : {bikeUnique}</p>
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