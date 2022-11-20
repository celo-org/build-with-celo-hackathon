import {React,useState} from "react";
import { ethers } from 'ethers';
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { uploadFileToIPFS } from '../services/PinataIPFSOptions';
import { border } from "@mui/system";
import "./LoadApp.css"
import { requestAccount } from "../components/navbar/NavBarHelper";
import NavBar from "../components/navbar/NavBar";
const LoadApp = () => {

  async function handleClick(){
    // let iskyc =  await kycOf();
    // console.log(iskyc)
    // // setKYC(iskyc)
  }
  
  return (
    <>
    <style>{"body { background-color: white }"}</style>
    <Box
        sx={{
        height: "90px",
        backgroundColor: "#ffffff",
        borderEndEndRadius: "12px",
        borderEndStartRadius: "12px",
        px: "40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        }}
    >
        <Box>
        <img
            style={{ width: "150px", height: "80px", objectFit: "contain" }}
            src="./assets/logo.png"
            alt="company logo"
        />
        </Box>
        <NavBar/>
        
        
    </Box>
    <Typography style={{textAlign: "center" ,fontSize : "80px" , color:"rgba(0,0,0,.85)", fontWeight : "bold",fontFamily : "sans-serif"}} >Welcome to Dygnify</Typography>
    <div style={{display:"flex" , justifyContent:"center",marginTop:"30px"}}>
        <Typography style={{textAlign: "center", width:"40%" ,fontSize : "18px" , color:"rgba(0,0,0,.85)", fontWeight : "400",fontFamily : "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New"}} >
            The new decentralized credit marketplace connecting investors with FinTechs in emerging markets
        </Typography>
    </div>

    <Box display="flex" justifyContent="space-between" padding="0 20%" margin="60px 0" onClick={handleClick} >
        <div style={{width : "45%", height:"200px"}} className="invest">
            <Typography style={{textAlign: "center" ,fontSize : "40px" ,  fontWeight : "bold",fontFamily : "sans-serif"}} >Invest</Typography>
            <Typography style={{ padding : "15px 10px", fontSize : "18px" ,  fontWeight : "400",fontFamily : "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New"}} >
                Invest USDC in real-world-assets and earn attractive, risk adjusted returns.
            </Typography>
        </div>

        <div style={{width : "45%", height:"200px"}} className="borrow">
            <Typography style={{textAlign: "center" ,fontSize : "40px" , fontWeight : "bold",fontFamily : "sans-serif"}} >Borrow</Typography>
            <Typography style={{ padding : "15px 10px", fontSize : "18px" , fontWeight : "400",fontFamily : "IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New"}} >
                Borrow USDC against real-world-assets in weeks, not months.
            </Typography>
        </div>  
    </Box>


    </>
  );
};
 
export default LoadApp;
