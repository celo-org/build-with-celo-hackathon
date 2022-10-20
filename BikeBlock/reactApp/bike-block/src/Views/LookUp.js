import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';


function LookUp(props) {

    let navigate = useNavigate();

    const [bikeSerial,setBikeSerial] = useState("MTBC49872254357ED");

    useEffect(() => {
      }, [props.web3,props.bikeBlock]);

    const handleChange = (event) => {
        setBikeSerial(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        lookUp()
        // TODO handle loading
        
      }

    const lookUp = async () => {
        console.log(props);
        const serialHash = Web3.utils.keccak256(bikeSerial);
        let tokenId = await props.bikeBlock.methods.bikeLookUp(serialHash).call();
        
        navigate('/bikes/'+tokenId);
        
    }


    return (
        <div className="text-center w-50">
            <h2>Bike Lookup</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="m-3">
                    <label >Serial Number</label>
                    <input id="serial" type="text" value={bikeSerial}  onChange={handleChange}  className="form-control"  placeholder="Serial Number"/>
                    
                </div>
                <input type="submit" value="Submit" />
            </form>
      </div>
    )
}

export default LookUp;
 