import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { isConnected, requestAccount } from "./NavBarHelper";
import "./NavBar.css";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NavBar = () => {
  const [connectionStatus, setConnectionStatus] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (metaMask) => {
    requestAccount(metaMask);
    setAnchorEl(null);
  };


  useEffect(() => {
    isConnected()
      .then((data) => {
        setConnectionStatus(data);
      })
      .catch(() => {
        console.log("Error in getting connection status");
      });
  }, []);

  return (
    <>
      <section className="nav">
        <Link to="/">
          {/* <Button variant="outlined">{" Home"}</Button> */}
        </Link>
        <Button
          // variant="outlined"
          // onClick={
          //   connectionStatus
          //     ? () => {}
          //     : () => {
          //         requestAccount()
          //           .then(() => {
          //             setConnectionStatus(true);
          //           })
          //           .catch(() => {
          //             setConnectionStatus(false);
          //           });
          //       }
          // }
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ backgroundColor: "#7165E3" }}
            variant="contained"
            size="large"
        >
          {connectionStatus ? "Disconnect Wallet" : "Connect Wallet"}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{width : "300px"}}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={()=>handleClose(true)} 
          sx={{width : "175px"}}>MetaMask</MenuItem>
          <MenuItem onClick={()=>handleClose(false)}>Coinbase</MenuItem>
        </Menu>
      </section>
    </>
  );
};

export default NavBar;
