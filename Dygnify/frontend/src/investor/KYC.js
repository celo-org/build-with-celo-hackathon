import React, { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import Identity from "./components/Identity";
import Photo from "./components/Photo";
import Address from "./components/Address";
import AddressProof from "./components/AddressProof";
import Processing from "./components/Processing";
import Verified from "./components/Verified";
import Profile from "./components/Profile";
import Passport from "./components/Passport";


const KYC = () => {
  const [kyc, setKyc] = useState("profile");
  const [fullName,setFullName]= useState("")
  const [verified,setVerified]= useState()

  const pageToNumber = {"profile":0, "identity":1,"passport": 1,"photo": 1,"address":2,"addressProof":2,"processing":3,"verified":4};
  const handleClick = (component,fullname,status) => {
    setKyc(component);
    if(kyc==="profile"){setFullName(fullname); }
    if(kyc==="processing"){setVerified(status); }
  };

  return (
    <>
      <style>{"body { background-color: #7165e3 }"}</style>
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
        <img
          style={{ width: "150px", height: "80px", objectFit: "contain" }}
          src="./assets/logo.png"
          alt="company logo"
        />
      </Box>
      <Stack
        sx={{
          color: "#ffffff",
          my: "28px",
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">
          Let’s Quickly get to know you before you start Investing !!
        </Typography>
      </Stack>
      <Stack
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          mt: "60px",
          mb: "20px",
          color: "#ffffff",
        }}
      >
        <Typography variant="h6">Profile</Typography>
        <Typography variant="h6">Identity</Typography>
        <Typography variant="h6">Address</Typography>
        <Typography variant="h6">AML/CFT</Typography>
      </Stack>
      <Box
        sx={{
          maxWidth: "765px",
          mx: "auto",
          alignItems: "center",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {pageToNumber[kyc]>0 ? <img src={"./done.gif"} style={{border:"4px solid white",borderRadius:"50%",width:"50px",height:"50px"}} className="App-logo" alt="logo" /> :
            <span
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#E5E5E5",
              borderRadius: "50%",
            }}
          ></span>
        }
        <hr
          style={{
            height: "8px",
            width: "180px",
            backgroundColor:  pageToNumber[kyc]>0 ?"white":"#979797",
            border: "none",
          }}
        />
        {pageToNumber[kyc]>1 ? <img src={"./done.gif"} style={{border:"4px solid white",borderRadius:"50%",width:"50px",height:"50px"}} className="App-logo" alt="logo" /> :
            <span
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#E5E5E5",
              borderRadius: "50%",
            }}
          ></span>
        }

        <hr
          style={{
            height: "8px",
            width: "180px",
            backgroundColor: pageToNumber[kyc]>1 ?"white":"#979797",
            border: "none",
          }}
        />
        {pageToNumber[kyc]>2 ? <img src={"./done.gif"} style={{border:"4px solid white",borderRadius:"50%",width:"50px",height:"50px"}} className="App-logo" alt="logo" /> :
            <span
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#E5E5E5",
              borderRadius: "50%",
            }}
          ></span>
        }
        <hr
          style={{
            height: "8px",
            width: "180px",
            backgroundColor: pageToNumber[kyc]>2 ?"white":"#979797",
            border: "none",
          }}
        />
        {pageToNumber[kyc]>3 ? <img src={"./done.gif"} style={{border:"4px solid white",borderRadius:"50%",width:"50px",height:"50px"}} className="App-logo" alt="logo" /> :
            <span
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#E5E5E5",
              borderRadius: "50%",
            }}
          ></span>
        }
      </Box>
      {(() => {
        switch (kyc) {
          case "profile":
            return <Profile handleClick={handleClick} />;
          case "identity":
            return <Identity handleClick={handleClick} />;
            case "passport":
            return <Passport handleClick={handleClick} />;
          case "photo":
            return <Photo handleClick={handleClick} />;
          case "address":
            return <Address handleClick={handleClick} />;
          case "addressProof":
            return <AddressProof handleClick={handleClick} />;
          case "processing":
            return <Processing handleClick={handleClick} fullName={fullName} />;
          case "verified":
            return <Verified handleClick={handleClick} verified={verified}/>;
          default:
            return <Profile />;
        }
      })()}
    </>
  );
};

export default KYC;
