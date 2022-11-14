// import { SetStateAction, useEffect, useState } from "react";
// import { Menu, Dropdown } from "antd";
// // import { Menu, MenuItem } from "@mui/material";
// import { Network, useCelo } from "@celo/react-celo";
// import { Button } from "@mui/material";
// import { Typography } from "antd";

// // import { SelectOutlined } from "@ant-design/icons";
// // import { getExplorer } from "../helpers/networks";
// // import Address from "../Address";

// const styling = {
//   item: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "var(--transparent-deep-fir-green)",
//     height: "3em",
//     padding: "6px",
//     color: "var(--white)"
//   },
//   darkItem: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "var(--grey)",
//     height: "3em",
//     padding: "6px",
//     color: "var(--orange)"
//   },
//   menuItem: {
//     background: "var(--transparent-dark-mode1)",
//     borderRadius: "0.4em",
//     color: "var(--grey)"
//   },
//   darkMenu: {
//     background: "var(--grey)",
//     borderRadius: "0.4em"
//   },
//   button: {
//     borderRadius: "0.4em"
//   },
//   darkmode: {
//     background: "var(--shadow-green)",
//     color: "var(--orange)"
//   }
// };

// interface ChainsProps {
//   setPageRef: Function;
//   setmessage: Function;
// }

// // setNetworkObject,  currentNetwork,
// function Chains(props: ChainsProps) {
//   const { updateNetwork, networks, network, address, connect, disconnect, initialised } = useCelo();
//   const { setPageRef, setmessage } = props;
//   const [currentNetwork, setCurrentNetork] = useState(network);

//   const handleMenuClick = async (e: { preventDefault: () => void; key: string | number }) => {
//     e.preventDefault();
//     let networkChoice: SetStateAction<Network>;
//     if (!currentNetwork) return null;
//     await updateNetwork(network).then(() => {
//       networkChoice = networks[Number(e.key)];
//       setCurrentNetork(networkChoice);
//     });
//   };

//   const mainMenu = (
//     <Menu onClick={() => handleMenuClick}>
//       {networks.map((items, key) => (
//         <Menu.Item key={key}>
//           <Typography className="flex justify-around ml-3 text-orange-400">{items.name}</Typography>
//         </Menu.Item>
//       ))}
//     </Menu>
//   );
//   return (
//     <>
//       <div>
//         <Dropdown overlay={mainMenu} trigger={["click"]}>
//           <Button variant="text" key={currentNetwork.chainId} sx={{ display: "flex", gap: 1 }}>
//             {/* <span>{currentNetwork.chainId}</span> */}
//             <span className=" text-orange-500 font-bold">{currentNetwork.chainId === network.chainId ? currentNetwork.name : "SelectNetwork"}</span>
//           </Button>
//         </Dropdown>
//       </div>
//     </>
//   );
// }

// export default Chains;



import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SetStateAction, useEffect, useState } from "react";
// import { Menu, MenuItem } from "@mui/material";
import { Network, useCelo } from "@celo/react-celo";

interface ChainsProps {
  setPageRef: Function;
  setmessage: Function;
}

function Chains(props: ChainsProps) {
  const { updateNetwork, networks, network } = useCelo();
  const { setPageRef, setmessage } = props;
  const [currentNetwork, setCurrentNetork] = useState(network);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = async (e: { preventDefault: () => void; key: string | number }) => {
    e.preventDefault();
    let networkChoice: SetStateAction<Network>;
    if (!currentNetwork) return null;
    await updateNetwork(network).then(() => {
      networkChoice = networks[Number(e.key)];
      setCurrentNetork(networkChoice);
    });
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
        {currentNetwork.chainId === network.chainId ? currentNetwork.name : "SelectNetwork"}
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
        {
          networks.map((items, key) => (
            <MenuItem onClick={handleClose} key={key}>{items.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Chains;
