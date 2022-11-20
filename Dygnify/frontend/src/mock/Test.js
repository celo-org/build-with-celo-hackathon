import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Test.css";
import { show } from "./TestHelper";
import Graph from "./components/Graph";
import { Card, Container, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Pools from "./components/Pools";
import Footer from "./components/Footer";

const Test = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src="/logo.png"
                alt="logo"
                loading="lazy"
                style={{ width: "120px" }}
              />
            </Typography>
            <Button color="inherit" variant="contained">
              Connect Wallet
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box mt={4} mb={4} textAlign="center">
        <Typography component="subtitle1">
          Dygnify is an open DeFi protocol and marketplace for real-world asset
          pools. Investments can earn rewards in CFG tokens.{" "}
          <span
            id="more"
            onClick={() => {
              show();
            }}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            Show more
          </span>
          <span
            id="less"
            onClick={() => {
              show();
            }}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              display: "none",
            }}
          >
            Show less
          </span>
        </Typography>
      </Box>
      <Box mt={1} textAlign="left" paddingX={4}>
        <Typography id="data" component="subtitle1" style={{ display: "none" }}>
          Dygnify allows originators and owners of assets in the real world,
          such as trade invoices or residential real-estate loans, to create a
          pool of their assets and offer it to DeFi investors. These assets
          create a stable yield for DeFi investors and DeFi protocols. They
          provide liquidity for the issuers, who set up and operate Dygnify
          pools, and their borrowers. Investments can also earn automatically
          protocol rewards in Dygnify's native token (CFG). These rewards are
          independent of the Dygnify pool, its issuer, and the return it’s
          generating. This is not investment advice — please see the Investment
          Disclaimer for more info and have a look at the Dygnify documentation.
        </Typography>
      </Box>
      <div className="graph">
        <Card
          sx={{
            mx: "auto",
            my: "10px",
            width: 400,
            height: 130,
            py: "10px",
            px: "10px",
            display: "flex",
          }}
        >
          <Graph />
          <div className="dai">
            <Avatar alt="" src="./assets/dai.png" />
            <Typography>82,516,815</Typography>
            &nbsp;
            <span>DAI</span>
            {/* <span>Total Value Locked</span> */}
          </div>
        </Card>
        <Card
          sx={{
            mx: "auto",
            my: "10px",
            width: 400,
            height: 130,
            py: "10px",
            px: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar alt="" src="./assets/dai.png" />
          <Button variant="outlined" sx={{ height: "40px" }}>
            {" Claim CFG"}
          </Button>
        </Card>
      </div>
      <Stack
        sx={{
          mt: "10px",
          maxWidth: 1150,
          height: 20,
          py: "10px",
          px: "30px",
          mx: "30px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "460px 273px 277px 64px", //"1.7fr 1.2fr 1fr 0.5fr",
          gap: "10px",
        }}
      >
        <div>Pools</div>
        <div>Investment Capacity</div>
        <div>Pool Value</div>
        <div>APY</div>
      </Stack>
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Pools />
      <Footer />
    </>
  );
};

export default Test;
