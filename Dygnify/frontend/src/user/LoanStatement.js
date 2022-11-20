import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const LoanStatement = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "180px",
          textAlign: "center",
          pt: "50px",
          color: "#fff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "16px",
        }}
      >
        <Typography variant="h4">Loan Account</Typography>
        <Typography variant="h4">Statement</Typography>
      </Box>
      <Container
        sx={{
          textAlign: "center",
          mt: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Typography variant="body1" display="inline">
            Account Number
          </Typography>
          <Typography variant="body1">xxxxxxxxxx</Typography>
        </Box>
        <Box
          m={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Statement From</Typography>
          <TextField
            label="From"
            type="date"
            sx={{ width: 150 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box
          m={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Statement To</Typography>
          <TextField
            label="To"
            type="date"
            sx={{ width: 150 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Container>
      <Button
        variant="contained"
        sx={{
          float: "right",
          mr: "180px",
        }}
      >
        Confirm
      </Button>
    </>
  );
};

export default LoanStatement;
