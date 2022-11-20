import React from "react";
import { Box, Container, Stack, Typography, Button } from "@mui/material";

const LocationPermission = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "140px",
          textAlign: "center",
          pt: "35px",
          color: "#ffffff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "12px",
        }}
      >
        <Stack
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Location Permission </Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            mx: "auto",
            maxWidth: "220px",
          }}
        >
          Provide Access to your location for better service
        </Typography>
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          textAlign: "center",
          pt: "42px",
        }}
      >
        <img
          style={{
            width: "208px",
            height: "150px",
            objectFit: "contain",
          }}
          src="./assets/location.png"
          alt="location"
        />
        <Box
          sx={{
            pt: "150px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9EA6BE",
              width: "140px",
            }}
          >
            May be Later
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#7165E3",
              width: "140px",
            }}
          >
            Allow
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default LocationPermission;
