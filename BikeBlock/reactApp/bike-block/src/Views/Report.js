import React, {useState,useEffect} from "react";
import {useParams} from 'react-router-dom';
import Web3 from 'web3';
import ReportCard from "./ReportCard";
import './Profile.css';

function Report(props) {

    let params = useParams();

    const [bikeSerial,setBikeSerial] = useState("MTBC49872254357ED");
    const [bikeLinks,setBikeLinks] = useState("");
    const [bikeLocation,setBikeLocation] = useState("");
    const [bikeAdditionalInfo,setBikeAdditionalInfo] = useState("");

    const [reportCounts,setReportCount] = useState("");
    const [reportCards,setReportCards] = useState();


    useEffect(() => {  
        //console.log(params);
        getReportCount(params.id)
    },[props.account])


    const getReportCount = async (tokenId) => {
        const reportCount = await props.bikeBlock.methods.getReportCountForToken(tokenId).call();
        setReportCount(reportCount);
        var reports = []
        for(var r = 0; r < reportCount;r++){
            let reportId = await props.bikeBlock.methods.getReportAtIndex(tokenId,r).call();
            let report = await props.bikeBlock.methods.getRecoveryReport(reportId).call();
            let reportCard = <ReportCard
                                key = {reportId}
                                bikeBlock = {props.bikeBlock}
                                account = {props.account}
                                reportId = {reportId}
                                report = {report}/>
                                
            reports.push(reportCard);
        }
        setReportCards(reports)
    }

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
        

      }


    return (
        <div className="padding-top">
           {reportCards}
        </div>
    )

}

export default Report;