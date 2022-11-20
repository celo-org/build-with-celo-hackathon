import React from "react";
import { Container, Typography, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const RadioButtonsGroup = () => {
  return (
    <FormControl sx={{ py: "22px" }}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
      >
        <FormControlLabel
          value="udyam"
          control={<Radio color="default" />}
          label="UDYAM"
        />
        <FormControlLabel
          value="shop"
          control={<Radio color="default" />}
          label="Shop establishment"
        />
        <FormControlLabel
          value="fssai"
          control={<Radio color="default" />}
          label="FSSAI"
        />
        <FormControlLabel
          value="gst"
          control={<Radio color="default" />}
          label="GST"
        />
        <FormControlLabel
          value="other"
          control={<Radio color="default" />}
          label="Others"
        />
      </RadioGroup>
    </FormControl>
  );
};

const BusinessOption = () => {
  return (
    <>
      <style>{"body { background-color: #7165E3; }"}</style>
      <Container
        maxWidth="sm"
        sx={{
          mt: "100px",
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">
          Which of the following do you have ?
        </Typography>
        <RadioButtonsGroup />
      </Container>
      <Container maxWidth="sm" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#ffffff", float: "right", color: "#7165E3" }}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default BusinessOption;
