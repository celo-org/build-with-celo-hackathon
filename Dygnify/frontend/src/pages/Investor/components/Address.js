import React, { useState } from "react";
import { Box, Button, Typography, Stack, Link } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Address = ({handleClick}) => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "800px",
          backgroundColor: "#ffffff",
          my: "28px",
          py: "22px",
          px: "100px",
          mx: "auto",
          borderRadius: "12px",
        }}
      >
        <Stack
          sx={{
            color: "#979797",
            my: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="subtitle1">Your Country</Typography>
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel>Country</InputLabel>
            <Select
              labelId="country"
              value={country}
              label="country"
              onChange={handleChangeCountry}
            >
              <MenuItem value={10}>United States of America</MenuItem>
              <MenuItem value={20}>India</MenuItem>
              <MenuItem value={30}>United Kingdom</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack
          sx={{
            color: "#979797",
            my: "10px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="subtitle1">Address Proof</Typography>
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel>Address</InputLabel>
            <Select
              labelId="Address"
              value={address}
              label="Address"
              onChange={handleChangeAddress}
            >
              <MenuItem value={1}>Passport</MenuItem>
              <MenuItem value={2}>Driving Licence</MenuItem>
              <MenuItem value={3}>Utility Bill</MenuItem>
              <MenuItem value={4}>Bank Statement</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>
      <Stack
        sx={{
          float: "right",
          mr: "275px",
          my: "24px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#7165E3",
          }}
          variant="contained"
          onClick={() => handleClick("addressProof")}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default Address;
