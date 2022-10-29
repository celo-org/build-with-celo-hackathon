import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom";
import './Profile.css';

function FullReport(props) {

    let params = useParams();

    useEffect(() => {
        console.log(params);
      }, [props.account]);
    


    return(
        <div  className="padding-top">    
            <p>Full report</p>
        </div>
    )
    
}

export default FullReport;