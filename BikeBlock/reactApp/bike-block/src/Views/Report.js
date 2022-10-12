import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import Web3 from 'web3';

function Report(props) {

    const [bikeSerial,setBikeSerial] = useState("MTBC49872254357ED");
    const [bikeLinks,setBikeLinks] = useState("");
    const [bikeLocation,setBikeLocation] = useState("");
    const [bikeAdditionalInfo,setBikeAdditionalInfo] = useState("");

    useEffect(() => {  
 
    },[])

    const handleChange = (event) => {
        switch(event.target.id) {
            case "serial":
                setBikeSerial(event.target.value);
                break;
            case "model":
                setBikeLinks(event.target.value);
                break;
            case "location":
                setBikeLocation(event.target.value);
                break;
            case "ai":
                setBikeAdditionalInfo(event.target.value);
                break;
        }
        
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        const web3 = props.web3;
        const serialHash = Web3.utils.keccak256(bikeSerial);
        /*
        let proposalPromise = props.bikeBlock.methods.(serialHash,props.account,"Asset URL").send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
        proposalPromise.then(function(result) {
          // tell we should reload
          console.log("true");
          console.log(result);
        })
        proposalPromise.catch((error) => {
          alert(error.message)
        });
        */
        //navigate('/bike/1');
      }


    return (
        <div >
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="m-3">
                    <label >Serial Number</label>
                    <input id="serial" type="text" value={bikeSerial}  onChange={handleChange}  className="form-control"  placeholder="Serial Number"/>
                </div>
                <div className="m-3">
                    <label >Links</label>
                    <input id="links" type="text" value={bikeLinks} onChange={handleChange} className="form-control"  placeholder="Make Model"/>
                </div>
                <div className="m-3">
                    <label >Location</label>
                    <input id="location" type="text" value={bikeLocation} onChange={handleChange} className="form-control"  placeholder="Location"/>
                </div>
                <div className="m-3">
                    <label htmlFor="formFileMultiple" className="form-label">Upload pictures</label>
                    <input className="form-control" type="file" id="formFileMultiple" multiple/>
                </div>
                <div className="m-3">
                    <label ></label>
                    <textarea id="ai" type="text" value={bikeAdditionalInfo} onChange={handleChange} className="form-control"  placeholder="Additional Info">

                    </textarea>
        
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default Report;