import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
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
