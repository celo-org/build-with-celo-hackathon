import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Link,
  Divider,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Identity = ({ handleClick }) => {
  const [country, setCountry] = useState("");
  const [id, setId] = useState("");

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeId = (event) => {
    setId(event.target.value);
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
          <Typography variant="subtitle1">ID</Typography>
          <FormControl sx={{ m: 1, width: 250 }}>
            <InputLabel>ID</InputLabel>
            <Select
              labelId="ID"
              value={id}
              label="ID"
              onChange={handleChangeId}
            >
              <MenuItem value={1}>Passport</MenuItem>
              <MenuItem value={2}>Driving Licence</MenuItem>
              <MenuItem value={3}>Aadhar Number</MenuItem>
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
          onClick={() => handleClick("passport")}
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default Identity;
