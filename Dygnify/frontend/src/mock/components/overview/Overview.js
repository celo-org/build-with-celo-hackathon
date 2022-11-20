import React from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Card,
  Stack,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "../Footer";

const Overview = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="">
          <Toolbar>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <img
                src="/logo.png"
                alt="logo"
                loading="lazy"
                style={{ width: "120px" }}
              />
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Branch Series 3
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Overview
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Investments
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Assets
            </Typography>
            <Button color="inherit" variant="contained">
              Connect Wallet
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack
        sx={{
          my: "20px",
          maxWidth: 1150,
          height: 80,
          py: "10px",
          px: "30px",
          mx: "30px",
          mx: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="content">
          <img src="./assets/rwa-market-icon.png" alt="" />
          <div className="text">
            <p> Branch Series 3(1754 Factory)</p>
            <p>Overview</p>
          </div>
        </div>
        <Button color="primary" variant="contained">
          Invest
        </Button>
      </Stack>
      <Box>
        <Card
          sx={{
            my: "20px",
            maxWidth: 1150,
            height: 150,
            py: "10px",
            px: "30px",
            mx: "30px",
            mx: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Typography>Emerging Market Consumer Loans</Typography>
            <Typography variant="overline">Asset type</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div>
            <Typography>3 years</Typography>
            <Typography variant="overline">Asset maturity</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography>10.45 %</Typography>
            <Typography variant="overline">Senior APY (30 days)</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography>46.24 %</Typography>
            <Typography variant="overline">Junior APY (90 days)</Typography>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />{" "}
          <div>
            <Typography>8,109,009 DAI</Typography>
            <Typography variant="overline">Pool value</Typography>
          </div>
        </Card>
      </Box>
      <Stack
        sx={{
          my: "20px",
          maxWidth: 1150,
          py: "10px",
          px: "30px",
          mx: "auto",
        }}
      >
        <Typography variant="h6">Asset Originator Details</Typography>
      </Stack>
      <Box>
        <Card
          sx={{
            my: "20px",
            maxWidth: 1150,
            height: 380,
            py: "10px",
            px: "30px",
            mx: "30px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack sx={{ py: "15px", px: "15px" }}>
            <img
              src="./assets/branch.png"
              alt=""
              style={{ height: "60px", width: "15%" }}
            />
          </Stack>
          <Typography variant="overline">
            Branch is a financial technology company that lends money to
            consumers using machine learning algorithms to determine credit
            worthiness via customers' smartphones. Branch was founded in 2015
            and has operations in Kenya, Nigeria, Tanzania, Mexico and India,
            and has since originated over $500M in loans to over 4 millions
            borrowers. This Dygnify pool will consist of tranches of a secured
            non convertible debenture with a maturity of 3 years backed by a
            portfolio of loans made to customers.The current weighted average
            loan balance is $49 (ranging from $6 to $2,500) with average
            maturity of 70 days.
          </Typography>
          <Stack
            sx={{
              py: "15px",
              px: "15px",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Typography variant="body">Issuer</Typography>
            <Typography variant="subtitle2">1754 Factory Series 3</Typography>
          </Stack>
          <Stack
            sx={{
              py: "15px",
              px: "15px",
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Typography variant="body">Links</Typography>
            <Typography variant="subtitle2">
              <Stack
                sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <Link>Executive Summary</Link>
                <Link>Website</Link>
                <Link>Contact the Issuer</Link>
              </Stack>
            </Typography>
          </Stack>
        </Card>
      </Box>
      <Stack
        sx={{
          mt: "40px",
          mb: "20px",
          maxWidth: 1150,
          py: "10px",
          px: "30px",
          mx: "auto",
        }}
      >
        <Typography variant="h5">Pool Status</Typography>
      </Stack>
      <Box
        sx={{
          my: "10px",
          mb: "30px",
          maxWidth: 1150,
          py: "10px",
          mx: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Box>
          <Card
            sx={{
              maxWidth: 1150,
              py: "10px",
              px: "30px",
              mx: "auto",
              height: "415px",
            }}
          >
            <Typography variant="h6">Assets</Typography>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Assets</Typography>
              <Typography>8,109,009 DAI</Typography>
            </Stack>
            <Divider></Divider>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Number of assets</Typography>
              <Typography>32</Typography>
            </Stack>
            <Divider></Divider>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Average financing fee</Typography>
              <Typography>13.10 %</Typography>
            </Stack>
            <Divider></Divider>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Average maturity</Typography>
              <Typography>35.2 months</Typography>
            </Stack>
            <br />
            <Typography variant="h6">Liquidity</Typography>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Available liquidity</Typography>
              <Typography>1 DAI</Typography>
            </Stack>
            <Divider></Divider>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Cash drag</Typography>
              <Typography>0 %</Typography>
            </Stack>
          </Card>
        </Box>
        <Box
          sx={{
            mx: "auto",
          }}
        >
          <Card
            sx={{
              maxWidth: 1150,
              py: "10px",
              px: "30px",
              mx: "auto",
            }}
          >
            <Stack
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Senior tranche</Typography>
              <Typography>7,194,136 DAI</Typography>
            </Stack>
            <Typography variant="caption">
              DROP token — Lower risk, stable return
            </Typography>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Token price</Typography>
              <Typography>1.0863 DAI</Typography>
            </Stack>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Senior yield (30d APY)</Typography>
              <Typography>10.47 %</Typography>
            </Stack>
          </Card>
          <Divider orientation="vertical" flexItem>
            <Typography variant="caption">
              Senior is protected by a 11.19% junior risk buffer (10.00%
              minimum)
            </Typography>
          </Divider>
          <Card
            sx={{
              maxWidth: 1150,
              py: "10px",
              px: "30px",
              mx: "auto",
            }}
          >
            <Stack
              sx={{
                py: "10px",
                px: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Junior tranche</Typography>
              <Typography>914,864 DAI</Typography>
            </Stack>
            <Typography variant="caption">
              TIN token — Higher risk, variable return
            </Typography>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Token price</Typography>
              <Typography>1.3288 DAI</Typography>
            </Stack>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Junior yield (90d APY)</Typography>
              <Typography>46.14 %</Typography>
            </Stack>
            <Stack
              sx={{
                py: "10px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <Typography>Junior provided by Issuer</Typography>
              <Typography>16.28 %</Typography>
            </Stack>
          </Card>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Overview;
