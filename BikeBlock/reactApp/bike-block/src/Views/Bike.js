import React, {useState,useEffect} from "react";
import {useParams, useLocation} from 'react-router-dom';

import {state} from '../Helpers/ContractHelper.js';
import BikeCard from "./BikeCard.js";

function Bike(props) {

    const [tokenId,setTokenId] = useState();
    const [bikeState,setBikeState] = useState("");

    const [showOwnerTools,setShowOwnersTools] = useState();
    const [isStolen,setIsStolen] = useState(false);

    const [reportCounts,setReportCount] = useState("");

    const [serialNumber,setSerialNumber] = useState("");
    const [bikeLocation,setBikeLocation] = useState("");
    const [bikeTime,setBikeTime] = useState("");
    const [otherDetails,setOtherDetails] = useState("");

    const [showReportCard,setReportCard] = useState(false);

    let params = useParams();
    let location = useLocation();
    const {bike} = location.state;

    useEffect(() => { 
        // TODO CHECK IF BIKE IS NULL THEN US PROPS
        setTokenId(bike.id);
        let stolen = bike.state == 2;
        setIsStolen(stolen);
        setBikeState()
        if(props.account != null) {
           checkIfOwner(bike.id);
        }
    },[props.account])

    const toggleReportCard = () => {
        if(showReportCard) {
            setReportCard(false);
        }else{
            setReportCard(true);
        }
    }

    const checkIfOwner = async (tokenId) => {
        const isOwner = await props.bikeBlock.methods.isTokenOwner(props.account,tokenId).call();
        setShowOwnersTools(isOwner);
        if(isOwner) {
            getReportCount(tokenId);
        }
    }

    const getReportCount = async (tokenId) => {
        const reportCount = await props.bikeBlock.methods.getReportCountForToken(tokenId).call();
        setReportCount(reportCount);
    }

    const reportStolen = async (tokenId) => {
        
        const stolenLocation = {"lat":30,"long":40};
        const time = parseInt(Date.now() / 1000);

        let tx = await props.bikeBlock.methods.setStolenBike(tokenId,time,stolenLocation,100).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
        
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        let tokenState = props.web3.utils.BN(bikeState).toString();
        setBikeState(state(tokenState));
    }

    const setNormal = async (tokenId) => {
        
        let tx = await props.bikeBlock.methods.setNormal(tokenId).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
        
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        let tokenState = props.web3.utils.BN(bikeState).toString();
        setBikeState(state(tokenState));
    }


    const handleChange = (event) => {
        switch(event.target.id) {
            case "serial":
                setSerialNumber(event.target.value);
                break;
            case "location":
                setBikeLocation(event.target.value);
                break;
            case "time":
                setBikeTime(event.target.value);
                break;
            case "od":
                setOtherDetails(event.target.value);
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        //const web3 = props.web3;
        //const serialHash = Web3.utils.keccak256(bikeSerial);
       
    }

    
    return (
        <div className="container d-flex justify-content-center padding-top">
            { showReportCard ?
            
            <div className="pop-up  position-absolute border text-center "  >
                        <h3>Report Bike</h3>
                        
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <div className="m-3">
                                <label >Serial Number</label>
                                <input id="serial" type="text" value={serialNumber}  onChange={handleChange}  className="form-control"  placeholder="Serial Number"/>
                            </div>
                            <div className="m-3">
                                <label >Location</label>
                                <input id="location" type="text" value={bikeLocation} onChange={handleChange} className="form-control"  placeholder="Location"/>
                            </div>
                            <div className="m-3">
                                <label >Time</label>
                                <input id="time" type="text" value={bikeTime} onChange={handleChange} className="form-control"  placeholder="Time"/>
                            </div>
                            <div className="m-3">
                                <label >Other details</label>
                                <textarea id="od" type="text" value={otherDetails} onChange={handleChange} className="form-control"  placeholder="Other details">

                                </textarea>
                    
                            </div>
                            <p>Tranaction Fee: </p>
                            <input type="submit" className="btn btn-primary m-3" value="Post Report" />
                
                        </form>
            </div>
            :
            <div></div>
            }
            <div>
           <div className= "d-flex flex-column">        
                <img src={`data:image/png;base64,${bike.image[0]}`}/>
                <p>Id:{bike.id}</p>
                <p>State:{state(bike.state)}</p>
                <h2>Details</h2>
                <p>{bike.info.bikeYear} {bike.info.bikeColor} {bike.info.bikeMakeModel}</p>
                <h2>Unique</h2>
                <p>{bike.info.unique}</p>
                <h2>Stolen Details</h2>
                <p>Bounty Price: {bike.stolen.bountyPayOut}</p>
                <p>time: {bike.stolen.time}</p>
                <p>location: {bike.stolen.location}</p>
                <p>StolenId: {bike.stolen.index}</p>
                    
            </div>
                {showOwnerTools ? 
                    <div>
                        {isStolen ?
                            <div className="d-flex justify-content-between w-100">
                                <button type ="button" className="btn btn-success" onClick={() => setNormal(tokenId)}>Recovered</button>
                                <button type ="button" className="btn btn-success" onClick={() => reportStolen(tokenId)}>Show Reports {reportCounts}</button>
                            </div>
                            :
                            <div className="d-flex justify-content-between w-100">
                                <button type ="button" className="btn btn-primary" onClick={() => reportStolen(tokenId)}>Report Stolen</button>
                                <button type ="button" className="btn btn-primary" onClick={() => reportStolen(tokenId)}>Transfer Owner</button>
                            </div>
                        }
                   
                    </div>
                    :
                        <div>
                            <button type ="button" className="btn btn-success" onClick={() => toggleReportCard()}>Post Report</button>
                        </div>
                }
            </div>
        </div>
        
    )

}

export default Bike;