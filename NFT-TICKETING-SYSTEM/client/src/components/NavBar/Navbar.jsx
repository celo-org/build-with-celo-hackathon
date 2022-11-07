import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import Navdrawer from "../Navdrawer/Navdrawer";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <AppBar
      sx={{ background: "linear-gradient(to right, #000 20%, #7228BB, #000 )" }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ width: "30%" }}>
            <Typography color="#fff" fontWeight="bold">
              LetsGo
            </Typography>
          </Box>
          <Box
            color="#fff"
            sx={{
              display: "flex",
              width: { xs: "5%", sm: "55%" },
              justifyContent: "space-around",
              opacity: { xs: 0, md: 1 },
            }}
          >
            <Typography fontWeight="bold"> Home</Typography>
            <Typography fontWeight="bold">Explore</Typography>
            <Typography fontWeight="bold">Resources</Typography>
          </Box>
          <Box>
            <ConnectButton />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpen}>
              <MenuIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Navdrawer handleOpen={handleOpen} open={open} setOpen={setOpen} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
