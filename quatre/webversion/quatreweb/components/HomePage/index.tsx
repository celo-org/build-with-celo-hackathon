import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
// import Connect from "./Connect";
import ConnectButton from "../ConnectButton";
import { MenuComponents } from "../MenuComponents";
import { dashboardCards } from "../dashboardInfo";
import Address from "../Address";
import { useCelo } from "@celo/react-celo";

const defaultAccount = `0x${"0".repeat(40)}`;

interface HomePageProps {
  tvl: number;
  currency: string;
  lightMode: boolean;
  networkName: string;
  setPageRef: Function;
  setmessage: Function;
}

export default function HomePage(props: HomePageProps): JSX.Element {
  const { address } = useCelo();
  const { lightMode, setPageRef, setmessage, tvl, currency, networkName } = props;

  return (
      <Container maxWidth="lg" className="mb-4">
        <Grid container>
          <Grid item xs={12} marginLeft={4}>
            <Box sx={{ width: "100%" }}>
              <div className="flex flex-row md:flex-row gap-3 items-center py-8">
                <Box sx={{diplay: 'flex', justifyContent: "space-between", alignItems: 'center'}}>
                  {/* <Typography variant="h5" className="font-bold text-orange-500" sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center" }}>
                    Welcome!
                  </Typography> */}

                  {/* <Box className="text-orange-500"> */}
                    <Address address={address || defaultAccount} size={4} copyable display />
                  {/* </Box> */}
                </Box>

                <div className="flex-1" />

                {/* <Box sx={{ display: "flex", justifyContent: "space-around", gap: 4, mb: 4 }}> */}
                  { !address && <ConnectButton setPageRef={setPageRef} setmessage={setmessage} /> }
                {/* </Box> */}
              </div>
            </Box>
          </Grid>

          <Grid item container xs={12}>
            {/* <Container maxWidth="lg" className="mb-4"> */}
              <Grid container spacing={3}>
                {dashboardCards(tvl || "2500", currency || "BNB", networkName || "BNB")?.map(({ name, Icon, description, arrow }, key) => (
                  <Grid item xs={4} padding={2} key={key}>
                    <Paper
                      className=" flex flex-row h-full border border-color-white items-center bg-orange-700"
                      sx={{
                        height: "120px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        gap: 2,
                        background: 'orange',
                        alignItems: "center"
                      }}
                    >
                      <Icon />

                      <Stack sx={{ placeItems: "center" }}>
                        <Typography variant="h4" className="font-bold text-[#ffffff]">
                          {name}
                        </Typography>
                        <Typography className="body text-[#ffffff]">{description}</Typography>
                      </Stack>

                      <Box className="flex-1" />

                      {arrow}
                    </Paper>
                  </Grid>
                  // </Box>
                ))}
              </Grid>
            {/* </Container > */}
          </Grid>

          <div className="flex justify-between items-center flex-wrap w-full mt-8 mb-5 gap-4">
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItem: "center" }}>
              <Typography variant="h4" className="font-bold text-[#212B36]" sx={{ flex: "start" }}>
                Transactions
              </Typography>

              <Button variant="text" size="small" sx={{ flex: "end" }}>
                View All
              </Button>
            </Box>
          </div>
        </Grid>
      {/* </Container> */}

      <Box>
        {/* <Container sx={{ py: 8 }}> */}
          <Grid container spacing={4}>
            <Grid item key={1} xs={12} sm={6} md={4} className="menuCompo1">
              <MenuComponents
                heading={"FINANCE"}
                content={`
                    Join or create communities that contribute to lend to 
                    one another without paying interest on loan. Every member
                    is a borrower and a lender at the same time.
                    In the end, everyone wins.
                    `}
                imageUrl={"/digesu.jpg"}
              />
            </Grid>
            <Grid item key={2} xs={12} sm={6} md={4}>
              <MenuComponents
                heading={"INVEST"}
                content={`Increasing inflation rate reduces the value of savings overtime. Commit idle funds to Digesu's public permissionless 
                    robot (PPR) and see how it grows. Everything is transparent. be sure you understand the risk involved with digital currency
                    `}
                imageUrl={"/invest.jpg"}
              />
            </Grid>
            <Grid item key={3} xs={12} sm={6} md={4} className="menuCompo2">
              <MenuComponents
                heading={"GOVERNANCE"}
                content={`
                    Your opinions can make a difference. Digesu decentralized governance 
                    system allows QFT holders to propose or vote for changes on the platform.
                    Participate in decision-making; earn reward for being an agent of growth.
                    `}
                imageUrl={"/governance.jpg"}
              />
            </Grid>
          </Grid>
        {/* </Container> */}
      </Box>
    </Container>
  );
}
