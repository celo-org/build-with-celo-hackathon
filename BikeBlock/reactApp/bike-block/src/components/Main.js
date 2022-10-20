import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';


import Register from '../Views/Register.js';
import LookUp from '../Views/LookUp.js';
import './Main.css'

function Main(props) {
    
    const [showRegistery,setRegistering] = useState(false);
    const [showLookUp,setLookUp] = useState(false);
    const [showView,setShowView] = useState(false);

    const OUTLINES = ["corners-red","corners-blue"];
    const [outline,setOutline] = useState(OUTLINES[0]);

    const [error,setError] = useState(null);

    useEffect(() => {
        checkAccount();
    },[props.account])

    const checkAccount = () => {
        if(props.account != null) {
            setOutline(OUTLINES[1]);
            
        }else{
            setError("No Wallet connected");
            setOutline(OUTLINES[0]);
        }
    }

    function changeView(buttonId) {
        setShowView(showView => ({
            check: !showView.check
        }));

        if(buttonId == 1){
            setRegistering(showRegistery => ({
                check: !showRegistery.check
            }));

        }else if(buttonId == 2){
            setLookUp(showLookUp => ({
                check: !showLookUp.check
            }));
        }else{
            setLookUp(false);
            setRegistering(false);
        }
    }

    return (
      
      
            <div className='hero-container'>
                <video src='/videos/bikeThieftTo.mp4' autoPlay loop muted />
                <h1>BIKE SECURITY</h1>
                <p>Digital asset</p>
                
                {
                    error != null && showView.check && props.account == null ?
                        <div className="corners shadow-box corners-bottom corners-red w-25 d-flex justify-content-center ">
                        <h5>Error: </h5>
                    </div>
                    :
                    <p></p>

                }
                
                { showView.check ?
                
                <div className={`shadow-box corners min-width w-50 ${outline}`}>
                    <div className="text-right w-100 m-2">
                  
                        <button type="button"  className="btn " onClick={() => changeView(3)} > 
                            Back
                         </button>
                        
                   
      
                    </div>

                {
                    showRegistery.check ?
                    <div className="d-flex justify-content-center">
                        <Register
                        account = {props.account}
                        web3 = {props.web3}
                        bikeBlock = {props.bikeBlock}
                        ipfs = {props.ipfs}
                        />
                    </div>
                    :
                    <div className="d-flex justify-content-center">
                        <LookUp
                        account = {props.account}
                        web3 = {props.web3}
                        bikeBlock = {props.bikeBlock}
                        />
                    </div>
                }
                </div>
                :
                <div className="d-flex justify-content-center align-self-center ">
                    <button onClick={() => changeView(1)} type="button" style={{height: "100px"}} className="btn btn-outline-primary btn-lg m-3 ">
                        Register a bike
                    </button>    
                        
                    <button onClick={() => changeView(2)} type="button" style={{height: "100px"}}  className="btn btn-outline-primary btn-lg m-3">
                        Bike Look Up
                    </button>
                </div>

            }        
            
                </div>
 

    )
}

export default Main;
 