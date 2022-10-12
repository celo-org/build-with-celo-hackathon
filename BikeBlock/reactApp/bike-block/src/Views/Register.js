import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';

function Register(props) {

    const [bikeSerial,setBikeSerial] = useState("MTBC49872254357ED");
    const [bikeMakeModel,setBikeMakeModel] = useState("");
    const [bikeColor,setBikeColor] = useState("");
    const [bikeUniqueCharacteristics,setBikeUniqueCharacteristics] = useState("");

    let navigate = useNavigate();


    const handleChange = (event) => {
        switch(event.target.id) {
            case "serial":
                setBikeSerial(event.target.value);
                break;
            case "model":
                setBikeMakeModel(event.target.value);
                break;
            case "color":
                setBikeColor(event.target.value);
                break;
            case "uc":
                setBikeUniqueCharacteristics(event.target.value);
                break;
        }
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const web3 = props.web3;
        const serialHash = Web3.utils.keccak256(bikeSerial);

        let proposalPromise = props.bikeBlock.methods.safeMint(serialHash,props.account,"Asset URL").send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
        proposalPromise.then(function(result) {
          // tell we should reload
          console.log("true");
          console.log(result);
        })
        proposalPromise.catch((error) => {
          alert(error.message)
        });
        //navigate('/bike/1');
      }

    return (
        <div className="text-center w-50">
        <h2>Register Bike</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="m-3">
                <label >Serial Number</label>
                <input id="serial" type="text" value={bikeSerial}  onChange={handleChange}  className="form-control"  placeholder="Serial Number"/>
            </div>
            <div className="m-3">
                <label >Make Model</label>
                <input id="model" type="text" value={bikeMakeModel} onChange={handleChange} className="form-control"  placeholder="Make Model"/>
            </div>
            <div className="m-3">
                <label >Color</label>
                <input id="color" type="text" value={bikeColor} onChange={handleChange} className="form-control"  placeholder="Color"/>
            </div>
            <div className="m-3">
                <label htmlFor="formFileMultiple" className="form-label">Upload pictures</label>
                <input className="form-control" type="file" id="formFileMultiple" multiple/>
            </div>
            <div className="m-3">
                <label >Unique Characteristics</label>
                <textarea id="uc" type="text" value={bikeUniqueCharacteristics} onChange={handleChange} className="form-control"  placeholder="Unique Characteristics">

                </textarea>
     
            </div>

            <input type="submit" value="Submit" />
        </form>
      </div>
    )
}

export default Register;
 