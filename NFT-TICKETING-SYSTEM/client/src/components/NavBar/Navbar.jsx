import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <AppBar sx={{ backgroundColor: "#E9F9DA" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ width: "30%" }}>
            <Typography color="#000" fontWeight="bold">
              LetsGo
            </Typography>
          </Box>
          <Box
            color="#000"
            sx={{
              display: { xs: "none", md: "flex" },
              width: "55%",
              justifyContent: "space-around",
            }}
          >
            <Typography fontWeight="bold"> Home</Typography>
            <Typography fontWeight="bold">Explore</Typography>
            <Typography fontWeight="bold">Resources</Typography>
          </Box>
          <Box>
            <ConnectButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
