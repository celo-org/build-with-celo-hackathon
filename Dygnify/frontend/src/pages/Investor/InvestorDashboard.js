import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import Opportunity from "./Opportunity";
import PieGraph from "../../investor/components/PieChart";
import Graph from "../../mock/components/Graph";
import { useState } from "react";
import { useEffect } from "react";
import { getAllActiveOpportunities } from "../../components/transaction/TransactionHelper";
import JuniorPoolCard from "./JuniorPoolCard";
import Header from "../../investor/components/Header";

const InvestorDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [juniorPool, setJuniorPool] = useState([]);
  const [seniorPool, setSeniorPool] = useState([]);

  useEffect(() => {
    const fetchJSON = async () => {
      let json = await getAllActiveOpportunities();
      setOpportunities(json);
    };

    fetchJSON();
  }, []);

  useEffect(() => {
    fetch("/juniorPool.json")
      .then((res) => res.json())
      .then((data) => setJuniorPool(data));
  }, []);

  useEffect(() => {
    fetch("/seniorPool.json")
      .then((res) => res.json())
      .then((data) => setSeniorPool(data));
  }, []);

  return (
    <>
      <style>{"body { background-color: #7165e3 }"}</style>
      <Header />
      <Stack sx={{ color: "#ffffff", mt: "28px", textAlign: "center" }}>
        <Typography variant="h4">Investor Dashboard</Typography>
      </Stack>
      <Box
        sx={{
          width: "1100px",
          backgroundColor: "#ffffff",
          mx: "auto",
          my: "12px",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "900px",
          }}
        >
          <PieGraph />
          <Stack
            sx={{
              py: "38px",
              width: 400,
            }}
          >
            <Graph />
          </Stack>
        </Box>
      </Box>
      <Stack
        sx={{
          mt: "30px",
          maxWidth: 1100,
          py: "10px",
          textAlign: "center",
          mx: "auto",
          color: "#ffffff",
        }}
      >
        <Typography variant="h4">Withdrawal Notifications</Typography>
      </Stack>
      <Box>
        {seniorPool.length ? (
          <>
            <Stack
              sx={{
                mt: "30px",
                maxWidth: 1100,
                py: "10px",
                mx: "auto",
                color: "#ffffff",
              }}
            >
              <Typography variant="h5">Senior Pool</Typography>
            </Stack>

            {seniorPool.map((data, index) => (
              <JuniorPoolCard key={index} data={data}></JuniorPoolCard>
            ))}
          </>
        ) : (
          <Stack
            sx={{
              mt: "30px",
              maxWidth: 1100,
              py: "10px",
              textAlign: "center",
              mx: "auto",
              color: "#ffffff",
            }}
          >
            <Typography variant="h4">No Withdrawal Available!!!</Typography>
          </Stack>
        )}
      </Box>
      <Box>
        {juniorPool.length ? (
          <>
            <Stack
              sx={{
                mt: "30px",
                maxWidth: 1100,
                py: "10px",
                mx: "auto",
                color: "#ffffff",
              }}
            >
              <Typography variant="h5">Junior Pool</Typography>
            </Stack>

            {juniorPool.map((data, index) => (
              <JuniorPoolCard key={index} data={data}></JuniorPoolCard>
            ))}
          </>
        ) : (
          <Stack
            sx={{
              mt: "30px",
              maxWidth: 1100,
              py: "10px",
              textAlign: "center",
              mx: "auto",
              color: "#ffffff",
            }}
          >
            <Typography variant="h4">No Withdrawal Available!!!</Typography>
          </Stack>
        )}
      </Box>
      <Box>
        {opportunities.length ? (
          <>
            <Stack
              sx={{
                mt: "30px",
                maxWidth: 1100,
                py: "10px",
                textAlign: "center",
                mx: "auto",
                color: "#ffffff",
              }}
            >
              <Typography variant="h4">Active Opportunities</Typography>
            </Stack>
            {opportunities.map((opportunity, index) => (
              <Opportunity key={index} opportunity={opportunity}></Opportunity>
            ))}
          </>
        ) : (
          <Stack
            sx={{
              mt: "30px",
              maxWidth: 1100,
              py: "10px",
              textAlign: "center",
              mx: "auto",
              color: "#ffffff",
            }}
          >
            <Typography variant="h4">
              Sorry..No Approved Opportunities!!!
            </Typography>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default InvestorDashboard;
