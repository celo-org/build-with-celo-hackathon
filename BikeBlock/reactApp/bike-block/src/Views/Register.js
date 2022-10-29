import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from 'web3';
import {Buffer} from 'buffer';
//import * as IPFS from 'ipfs-core'

function Register(props) {

    const [bikeSerial,setBikeSerial] = useState("MTBC49872254357EE");
    const [bikeMakeModel,setBikeMakeModel] = useState("Trek Session");
    const [bikeColor,setBikeColor] = useState("Blue");
    const [bikeYear,setBikeYear] = useState(new Date().getFullYear());
    const [bikeUniqueCharacteristics,setBikeUniqueCharacteristics] = useState("Mullet Wheelset");

    var imageBuffers = [];

    const [txFee,setTxFee] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        console.log(props);
        getTxFee();
      }, [props.account]);


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

    const getTxFee = () => {
        if(props.account == null){return}
        const serialHash = Web3.utils.keccak256("1");
        let tx = props.bikeBlock.methods.safeMint(serialHash,props.account,"asset url")
        let gas = tx.estimateGas();
        let gasEstimate;
        gas.then(function(result) {
            gasEstimate = result;
            return props.web3.eth.getGasPrice();
            
        }).then(function(gasPrice) {
            // calcualte transaction fee
            let transactionFee = gasPrice * gasEstimate;
            let stringTF = Web3.utils.toBN(transactionFee).toString();
            let eth = Web3.utils.fromWei(stringTF);
            // Get celo cost
            console.log(eth);
            setTxFee(eth);
        })

        
        gas.catch((error) => {
            console.log(error);
        })

    }

    const retrieveFile = (e) => {
        for(var f = 0; f < e.target.files.length;f++){
            const data = e.target.files[f];
            console.log(data);
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(data);
            reader.onloadend = () => {
                
                imageBuffers.push(Buffer(reader.result));
              console.log("Buffer data: ", Buffer(reader.result));
            }
        } 
        //const data = e.target.files[0];

        e.preventDefault();  
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const web3 = props.web3;
        const serialHash = Web3.utils.keccak256(bikeSerial);
        
        var imageUri = [];
        
        for(var b = 0; b < imageBuffers.length;b++){


            //const results = node.add(data)

            // we loop over the results because 'add' supports multiple 
            // additions, but we only added one entry here so we only see
            // one log line in the output

            const { cid } = await props.ipfs._ipfs.add(imageBuffers[b]);
            imageUri.push(cid.toString());

            //for await (const { cid } of results) {
            // CID (Content IDentifier) uniquely addresses the data
            // and can be used to get it again.
            console.log(cid.toString())
        }

        const json = {
            'bikeId':serialHash,
            'bikeYear':bikeYear,
            'bikeMakeModel':bikeMakeModel,
            'bikeColor':bikeColor,
            'unique':bikeUniqueCharacteristics,
            'images':imageUri
        }

        let stringJson = JSON.stringify(json)
        const { cid } = await props.ipfs._ipfs.add(stringJson);
      
        let proposalPromise = props.bikeBlock.methods.safeMint(serialHash,props.account,cid.toString()).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
        proposalPromise.then(function(result) {
          // tell we should reload
          //  console.log("true");
          console.log(result);
          // 
          //navigate('/bike/1');
        })
        proposalPromise.catch((error) => {
          alert(error.message)
        });
      
      }

    return (
        <div className="text-center ">
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
                <input className="form-control" type="file" id="formFileMultiple" onChange={retrieveFile} multiple/>
            </div>
            <div className="m-3">
                <label >Unique Characteristics</label>
                <textarea id="uc" type="text" value={bikeUniqueCharacteristics} onChange={handleChange} className="form-control"  placeholder="Unique Characteristics">

                </textarea>
     
            </div>
            <p>Tranaction Fee: {txFee} </p>
            <input type="submit" className="btn btn-primary m-3" value="Mint Digital Asset" />
           
        </form>
      </div>
    )
}

export default Register;
 