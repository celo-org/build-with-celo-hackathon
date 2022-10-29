import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {useParams} from 'react-router-dom';

function ReportCard(props) {

    let params = useParams();

    const [assetURI,setAssetURI] = useState("");
    const [rescuers,setRescuers] = useState("");
    const [reportId,setReportId] = useState("");
    const [showOwnerTools,setShowOwnerTools] = useState(false);


    useEffect(() => {

        setReportId(props.reportId);
        setAssetURI(props.report.assetURI);
        setRescuers(props.report.rescuers);
        if(props.account != null) {
            // pass tokenId check owner
            checkIfOwner(params.id)
        }

      }, [props.account]);
    

    const checkIfOwner = async (tokenId) => {
        const isOwner = await props.bikeBlock.methods.isTokenOwner(props.account,tokenId).call();
        setShowOwnerTools(isOwner);
    }

    const payOut = async () => {
        const tx = await props.bikeBlock.methods.payOutBounty(params.id,reportId).send({from:props.account,gasPrice: '1000000000',gas: 5_000_000,gasLimit: 300_000});
    }


    return(
        <div className='card m-2 '>
            <p>Url {assetURI}</p>
            <p>Poster address: {rescuers}</p>
            {showOwnerTools?
                <button type ="button" className="btn btn-primary" onClick={() => payOut()}>Payout Bounty</button>
            :
                <div></div>
            }
        </div>

    )
    
}

export default ReportCard;