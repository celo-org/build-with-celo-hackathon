import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const DashboardReview = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "100vh",
          textAlign: "center",
          pt: "50px",
          color: "#fff",
        }}
      >
        <Typography variant="h5">Personal Details</Typography>
        <Typography variant="h5">
          Would you like to change any detail ?{" "}
        </Typography>
        <Container
          sx={{
            mx: "auto",
            mt: "50px",
            textAlign: "left",
          }}
        >
          <Stack
            sx={{
              //   display: "flex",
              //   flexDirection: "row",
              //   justifyContent: "space-evenly",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <Typography variant="h6">Account Number</Typography>
            <Typography variant="h6">xxxxxxxxxx</Typography>
          </Stack>
          <Stack
            sx={{
              //   display: "flex",
              //   flexDirection: "row",
              //   justifyContent: "space-evenly",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <Typography variant="h6">Account Holder</Typography>
            <Typography variant="h6">xxxxxxxxxx</Typography>
          </Stack>
          <Stack
            sx={{
              //   display: "flex",
              //   flexDirection: "row",
              //   justifyContent: "space-evenly",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <Typography variant="h6">Communication Address</Typography>
            <Typography variant="h6">Navi Mumbai</Typography>
            <EditIcon />
          </Stack>
          <Stack
            sx={{
              //   display: "flex",
              //   flexDirection: "row",
              //   justifyContent: "space-evenly",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <Typography variant="h6"> Mobile Number</Typography>
            <Typography variant="h6">xxxxxxxxxx</Typography>
            <EditIcon />
          </Stack>
          <Stack
            sx={{
              //   display: "flex",
              //   flexDirection: "row",
              //   justifyContent: "space-evenly",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            <Typography variant="h6">Language Preference</Typography>
            <Typography variant="h6">English</Typography>
            <EditIcon />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default DashboardReview;
