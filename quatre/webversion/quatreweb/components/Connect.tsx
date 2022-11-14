import * as React from "react";
import { Button, Menu } from "@mui/material";
import styles from "../styles/local/components/navbar.module.css";
import Address from "./Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "./helpers/networks";
import { useCelo } from "@celo/react-celo";
import MenuItem from '@mui/material/MenuItem';


const zero = `0x${"0".repeat(40)}`;

interface ConnectProps {
  setmessage: Function;
  setPageRef: Function;
}

function Connect(props: ConnectProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { network, connect, disconnect, address, initialised, } = useCelo();
  const { setmessage, setPageRef } = props;

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const reconnect = async() => {
    try {
      if (initialised) {
        setmessage("Wallet already connected");
        setPageRef(1);
        return;
      }
      await connect().then(result => {
        if (result){
          setmessage("Connected");
          setPageRef(1);
        }
      });
    } catch (e) {
      console.log(e);
      setmessage("Something went wrong. Please check your network");
      setPageRef('home');
    }
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Account
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>
          <div className="flex justify-center flex-col pt-2">
            <Address 
              avatar="left"
              size={6}
              copyable
              address={address || zero}
              style={{
                fontSize: "20px",
                display: "flex",
                justifyContent: "center",
                paddingLeft: "0.2em"
              }}
              display={true} 
              styleAvatarRight={undefined}            
              />
            <div style={{ marginTop: "10px", padding: "8px 90px" }}>
              <a href={`${getExplorer(network.chainId)}/address/${address}`} target="_blank" rel="noreferrer">
                <SelectOutlined style={{ marginRight: "5px" }} />
                View on Explorer
              </a>
            </div>
            <div className="flex justify-center gap-2">
              <div className="flex justify-center">
                <Button onClick={async() => { await disconnect().then((t) => { setmessage('Logged out'); setPageRef(0);}); }}>
                  <div className=" text-gray-300 flex justify-center align-middle border p-4 rounded-sm bg-transparent w-full">Logout</div>
                </Button>
                <Button onClick={async() => await reconnect()}>
                  <div className=" text-gray-300 flex justify-center align-middle border p-4 rounded-sm bg-transparent w-full">Reconnect</div>
                </Button>
              </div>
            </div>
          </div>
        </MenuItem>
      
      </Menu>
    </div>
  );
}
    // <Box>
    //   <Dropdown overlay={menu} trigger={["click"]}>
    //     <Tooltip title="Click to log out or reconnect">
    //       <Button variant="text" style={{ color: "orange", fontSize: "bold" }}>
    //         Account
    //       </Button>
    //     </Tooltip>
    //   </Dropdown>
    // </Box>

export default Connect;
