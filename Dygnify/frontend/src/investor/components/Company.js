import React from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Company = ({ src, name, data, value, apy, path }) => {
  return (
    <>
      <Card
        sx={{
          maxWidth: 1150,
          height: 100,
          px: "16px",
          mx: "auto",
          my: "16px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: " row",
            alignItems: "center",
          }}
        >
          <img style={{ width: "88px", height: "56px" }} src={src} alt="" />
          <Stack
            sx={{
              width: "250px",
            }}
          >
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="body2">{data}</Typography>
          </Stack>
        </Box>
        <Card
          sx={{
            border: "1px solid #7165E3",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "12px",
            width: "80px",
            textAlign: "center",
          }}
        >
          <Link to={`/opportunity-details/${path}`}>Open</Link>
        </Card>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">{value}</Typography>
          &nbsp;
          <Typography variant="body2">{process.env.REACT_APP_TOKEN_NAME}</Typography>
        </Stack>
        <Typography>{apy}%</Typography>
      </Card>
    </>
  );
};

export default Company;
