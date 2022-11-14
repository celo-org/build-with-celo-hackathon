// import * as React from "react";
// import styles from "../../styles/local/components/navbar.module.css";
// import AppBar from "@mui/material/AppBar";
// import { Box, Toolbar, Typography, Menu, Container, Button, MenuItem, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Connect from "../Connect";
// import Chains from "../Chains/Chains";
// import FetchTokenBalance from "../FetchTokenBalance";
// import Link from 'next/link';
// import { Switcher } from "./Switcher";
// import { useCelo } from "@celo/react-celo";


// interface NavBarProps {
//   toggleMode: boolean;
//   setPageRef: Function;
//   setmessage: Function;
// }

// function Navbar(props: NavBarProps) {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//   const { address, initialised } = useCelo();

//   const { toggleMode, setPageRef, setmessage } = props;

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//   //   setAnchorElUser(event.currentTarget);
//   // };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   // const handleCloseUserMenu = () => {
//   //   setAnchorElUser(null);
//   // };
//   return (
//     <AppBar position="static" sx={{ background: "none", }} elevation={1}>
//       {/* <Container maxWidth="xl"> */}
//         <Toolbar disableGutters>
//           <Link href="/" passHref >
//             <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
//               <img src="/images/logo.png" alt="company logo" className="logo" width={180} height={50} />
//             </Typography>
//           </Link>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
//               <MenuIcon className="text-orange-500" />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "left"
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left"
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" }
//               }}
//             > 
//             <Switcher toggleMode={toggleMode} />
//             <MenuItem ><FetchTokenBalance /></MenuItem>
//               {/* <Typography textAlign="center"> */}
//                 {
//                   ['Home', 'Finance', 'Invest', 'Governance', 'Documentation'].map((item, index) => (
//                     // {
//                       index < 4 ? <MenuItem 
//                         className='text-orange-500' 
//                         onClick={() => setPageRef(index)}
//                         key={index}
//                       >
//                         {item}
//                       </MenuItem> : <MenuItem key={index}>
//                           <Link href="https://github.com/Quatre-Finance/Q-paper" passHref key={index}>
//                             {/* <a title="Documentation"> */}
//                               {/* <Button className='text-orange-500'> */}
//                                 {item}
//                                 {/* </Button> */}
//                               {/* </a> */}
//                           </Link>
//                       </MenuItem>

//                     // }
//                   ))
//                 }
//               {/* </Typography> */}
//             </Menu>
//           </Box>

//           {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}> */}
//             <Link href="/" passHref>
//               <img src="/images/logo.png" alt="company logo" className="logo" width={180} height={50} />
//             </Link>
//           {/* </Typography> */}
//           {/* index < 4 ?  */}
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: 4, w: '100%' } }}>
//             {
//               ['Home', 'Finance', 'Invest', 'Governance', 'Documentation'].map((item, index) => (
//                   <Button 
//                     variant="text" 
//                     className='text-orange-700'
//                     sx={{background: 'none'}}
//                     onClick={() => setPageRef(index)}
//                     key={index}
//                   >
//                     {item}
//                   </Button> 
//               ))
//             }
//             {/* : <Link href="https://github.com/Quatre-Finance/Q-paper" passHref key={index}><a title="Documentation"><Button className='text-orange-500'>{item}</Button></a></Link> */}
//             <Typography ><FetchTokenBalance /></Typography>
//           </Box>

//           <Box sx={{ flexGrow: 0, display: "flex" }} className="ml-6">
//             {
//               initialised && address && <>
//                 <Chains setPageRef={setPageRef} setmessage={setmessage} />
//                 <Connect setmessage={setmessage} setPageRef={setPageRef} />
//               </>
//             } 
//           </Box>
//           <Switcher toggleMode={toggleMode}/>
//         </Toolbar>
//       {/* </Container> */}
//     </AppBar>
//   );
// }
// export default Navbar;








import * as React from "react";
// import styles from "../../styles/local/components/navbar.module.css";
import AppBar from "@mui/material/AppBar";
import { Box, Toolbar, Typography, Menu, Container, Button, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConnectButton from "../ConnectButton";
import Connect from "../Connect";
import Chains from "../Chains/Chains";
import FetchTokenBalance from "../FetchTokenBalance";
import Link from 'next/link';
import { Switcher } from "./Switcher";
import { useCelo } from "@celo/react-celo";

interface NavBarProps {
  toggleMode: boolean;
  setPageRef: Function;
  setmessage: Function;
}

function Navbar(props: NavBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { address, initialised } = useCelo();

  const { toggleMode, setPageRef, setmessage } = props;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ background: "none" }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            <Link href="/" passHref>
              <img src="/images/logo.png" alt="company logo" className="logo" width={180} height={50} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon className="text-orange-500" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            > 
              <Switcher toggleMode={toggleMode} />
              <MenuItem ><Typography textAlign="center"><FetchTokenBalance /></Typography></MenuItem>
              <Typography textAlign="center">
                <MenuItem ><Button className='text-orange-500' onClick={() => setPageRef(0)}>Home</Button></MenuItem>
                <MenuItem ><Button className='text-orange-500' onClick={() => setPageRef(1)}>Finance</Button></MenuItem>
                <MenuItem ><Button className='text-orange-500' onClick={() => setPageRef(2)}>Invest</Button></MenuItem>
                <MenuItem ><Button className='text-orange-500' onClick={() => setPageRef(3)}>Governance</Button></MenuItem>
                <MenuItem >
                  <Link href="https://github.com/Quatre-Finance/Q-paper" title="Documentation" passHref>
                    <Button className='text-orange-500'>
                      Documentation
                    </Button>
                  </Link>
                </MenuItem>
              </Typography>
            </Menu>
          </Box>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link href="/" passHref>
              <img src="/images/logo.png" alt="company logo" className="logo" width={180} height={50} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", gap: 0, w: '100%' } }}>
            <Button className='text-orange-500' onClick={() => setPageRef(0)}>Home</Button>
            <Button className='text-orange-500' onClick={() => setPageRef(1)}>Finance</Button>
            <Button className='text-orange-500' onClick={() => setPageRef(2)}>Invest</Button>
            <Button className='text-orange-500' onClick={() => setPageRef(3)}>Governance</Button>
            <Link href="https://github.com/Quatre-Finance/Q-paper" title="Documentation" passHref>
              <Button className='text-orange-500'>
                Documentation
              </Button>
            </Link>
            <Typography ><FetchTokenBalance /></Typography>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }} className="ml-6">
            <Chains setPageRef={setPageRef} setmessage={setmessage} />
            {address && <Connect setPageRef={setPageRef} setmessage={setmessage} />}
            {!address && <ConnectButton setPageRef={setPageRef} setmessage={setmessage} />}
          </Box>
          <Switcher toggleMode={toggleMode}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

