import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";


// TODO use Helpers
function state(stateId) {

    switch(stateId) {
        case '0':
            return("None");
        case '1':
            return("Normal");
        case '2':
            return("Stolen");
        case '3':
            return("Found");
    }
}


function SideCard(props) {

    let params = useParams();
    const [bikeState,setBikeState] = useState("");
    const [reportAmount,setReportAmount] = useState(null);
  

    useEffect(() => {  
        getLastSeen();
        getReports();
        checkState();
    },[])

    const getLastSeen = async () => {
        console.log("Last seen");
        let stolenInfo = await props.bikeBlock.methods.getStolenInfo(props.tokenId).call();
        console.log(stolenInfo);
    }

    const getReports = async () => {
        let amount = await props.bikeBlock.methods.getReportCountForToken(props.tokenId).call();
    }

    const checkState = async () => {
        let bikeState = await props.bikeBlock.methods.getBikeState(props.tokenId).call();
        setBikeState(state(bikeState));
    }


    return (

            <div className="card mb-3 m-5 bg-secondary" >
                <div className="row g-0">
                    <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                    <div className="card-body">

                        <h5 className="card-title">Stolen Card </h5>
                        <p className="card-text">TokenId:{props.tokenId}</p>
                        <p className="card-text">Bike State:{bikeState}</p>
                        <p className="card-text">Make model</p>
                        <p className="card-text">Color</p>
                        <p className="card-text">Unique Characteristics</p>

                        <p className="card-text">Last Seen:</p>
                        <p className="card-text">Report Count: </p>
                        <p className="card-text">Report Count: </p>

                        <Link className="text-decoration-none w-100 " to={'/bountys/'+props.tokenId}>
                            <button type="button" className="btn  btn-primary">Create Report</button>
                        </Link>
                        
                    </div>
                    </div>
                </div>
            </div>
 
    )
}

export default SideCard;