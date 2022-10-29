import React, {useState,useEffect} from "react";
import {useParams, useLocation} from 'react-router-dom';

import {state} from '../Helpers/ContractHelper.js';
import BikeCard from "./BikeCard.js";
import Web3 from 'web3';

import {Link} from "react-router-dom";

function Bike(props) {

    const [tokenId,setTokenId] = useState();
    const [bikeState,setBikeState] = useState("");

    const [showOwnerTools,setShowOwnersTools] = useState();
    const [isStolen,setIsStolen] = useState(false);

    const [reportCounts,setReportCount] = useState("");
    const [serialNumber,setSerialNumber] = useState("");
    const [isValid,setValid] = useState(false);
    const [bikeLocation,setBikeLocation] = useState("");
    const [bikeTime,setBikeTime] = useState("");
    const [otherDetails,setOtherDetails] = useState("");

    const [toAddress,setToAddress] = useState("");

    const [showReportCard,setReportCard] = useState(false);
    const [showTransferCard,setTransferCard] = useState(false);

    let params = useParams();

    let location = useLocation();
    const {bike} = location.state;

    useEffect(() => { 
        console.log(params.id);
        console.log(bike);
        setTokenId(bike.id);
        let stolen = bike.state == 2;
        setIsStolen(stolen);
        if (stolen) {
            getReportCount(bike.id);
        }
        setBikeState(state(bike.state))
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

    const toggleTransferCard = () =>{
        if(showTransferCard){
            setTransferCard(false);
        }else{
            setTransferCard(true);
        }
    }

    const checkIfOwner = async (tokenId) => {
        console.log("Check if owner");
        const isOwner = await props.bikeBlock.methods.isTokenOwner(props.account,tokenId).call();
        setShowOwnersTools(isOwner);
        
    }
 
    const getReportCount = async (tokenId) => {
        console.log(props.bikeBlock.methods);

        const reportCount = await props.bikeBlock.methods.getReportCountForToken(tokenId).call();
    
        setReportCount(reportCount);
    }

    const reportStolen = async (tokenId) => {
        console.log("Report Stolen");
        const stolenLocation = {"lat":30,"long":40};
        const time = parseInt(Date.now() / 1000);

        let tx = await props.bikeBlock.methods.setStolenBike(tokenId,time,stolenLocation,0).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
        
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        let tokenState = props.web3.utils.BN(bikeState).toString();
        setBikeState(state(tokenState));
        let stolen = bike.state == 2;
        setIsStolen(stolen);
    }

    const setNormal = async (tokenId) => {
        console.log("Set Normal");
        let tx = await props.bikeBlock.methods.setNormal(tokenId).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
        
        let bikeState = await props.bikeBlock.methods.getBikeState(tokenId).call();
        let tokenState = props.web3.utils.BN(bikeState).toString();
        setBikeState(state(tokenState));

        let stolen = bike.state == 2;
        setIsStolen(stolen);
    }


    const handleChange = (event) => {
        switch(event.target.id) {
            case "toAddress":
                setToAddress(event.target.value);
                break;
            case "serial":
                const serialHash = Web3.utils.keccak256(serialNumber);
                setValid(serialHash==bike.info.bikeId);
                
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
        console.log("Post report");
        event.preventDefault();
        event.stopPropagation();

        let tx = await props.bikeBlock.methods.reportStolenBike(serialNumber,"Where Abouts").send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});

    }

    const handleTransferSubmit = async (event) => {
        console.log("Transfer Bike");
        event.preventDefault();
        event.stopPropagation();
        console.log(props.account);
        let tx = await props.bikeBlock.methods.transferFrom(props.account,toAddress,tokenId).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
    }

    
    return (
        <div className="container padding-top d-flex justify-content-center">
            <div className="card ">
            
            { showTransferCard ?
            
            <div className="pop-up   position-absolute border text-center "  >
                        <h3>Transfer Bike</h3>
                       
                        <button type ="button" className="btn" onClick={() => toggleTransferCard()}>Back</button>
                        
                        <form autoComplete="off" onSubmit={handleTransferSubmit}>
                            <div className="m-3">
                                <label >To Address</label>
                                <input id="toAddress" type="text" value={toAddress} onChange={handleChange} className="form-control"  placeholder="0x000"/>
                            </div>
                            <p>Tranaction Fee: </p>
                            <input type="submit" className="btn btn-primary m-3" value="Post Report" />
                
                        </form>
            </div>
            :
            <div></div>
            }




            { showReportCard ?
            
            <div className="pop-up   position-absolute border text-center "  >
                        <h3>Report Bike</h3>
                       
                        <button type ="button" className="btn" onClick={() => toggleReportCard()}>Back</button>
                        
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <div className="m-3">
                                <label >Serial Number</label>
                                <input id="serial" type="text" value={serialNumber}  onChange={handleChange}  className="form-control"  placeholder="Serial Number"/>
                                {isValid?
                                <p>True</p>
                                    :
                                <p>False</p>
                                }
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
                <p>State:{bikeState}</p>
                <h2>Details</h2>
                <p>{bike.info.bikeYear} {bike.info.bikeColor} {bike.info.bikeMakeModel}</p>
                <h2>Unique</h2>
                <p>{bike.info.unique}</p>
                { bike.stolen != null?
                <div>
                                   <h2>Stolen Details</h2>
                                   <p>Bounty Price: {bike.stolen.bountyPayOut}</p>
                                   <p>time: {bike.stolen.time}</p>
                                   <p>location: {bike.stolen.location}</p>
                                   <p>StolenId: {bike.stolen.index}</p>
                </div>
                                :
                                <p></p>
                }
                

                    
            </div>
                {isStolen ? 
                    <div  className="d-flex justify-content-between w-100">
                        {showOwnerTools ?
                            <div>
                                <button type ="button" className="btn btn-success" onClick={() => setNormal(tokenId)}>Recovered</button>
                            </div>
                            :
                                <div>
                                    <button type ="button" className="btn btn-success" onClick={() => toggleReportCard()}>Post Report</button>
                                </div>
                     
                        
                        }
                        <Link
                                        to={"/reports/"+tokenId}
                                    >
                                        <button type ="button" className="btn btn-success">Show Reports {reportCounts}</button>
                         </Link>
                   
                    </div>  
                    :

                        <div>
                            {showOwnerTools ? 
                            <div className="d-flex justify-content-between w-100">
                                    <button type ="button" className="btn btn-primary" onClick={() => reportStolen(tokenId)}>Report Stolen</button>
                                    <button type ="button" className="btn btn-primary" onClick={() => toggleTransferCard()}>Transfer Owner</button>
                            </div>

                            :
                            <p></p>
                            }
                         </div>
                        
                       
                }
                
            </div>
            </div>
        </div>
        
    )

}

export default Bike;