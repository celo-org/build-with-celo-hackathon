import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';

import Register from './Register.js';
import LookUp from './LookUp.js';

function Main(props) {
    
    const [showRegistery,setRegistering] = useState(false);
    const [showLookUp,setLookUp] = useState(false);

    const [showView,setShowView] = useState(false);

    useEffect(() => {

    })

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
      
        <div className=" p-3 container">

            { showView.check ?
                <div>
                    <div className="text-right w-100">
                        <button type="button"  onClick={() => changeView(3)} > Back </button>
                    </div>

                {
                    showRegistery.check ?
                    <div className="d-flex justify-content-center">
                        <Register
                        account = {props.account}
                        web3 = {props.web3}
                        bikeBlock = {props.bikeBlock}
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
 