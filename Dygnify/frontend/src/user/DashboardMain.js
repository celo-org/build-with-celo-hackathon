import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Stack,
  Link,
  Button,
  Popper,
} from "@mui/material";

const DashboardMain = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

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
        <Stack
          sx={{
            textAlign: "left",
            display: "grid",
            gridTemplateColumns: "3fr 5fr",
          }}
        >
          <Avatar
            alt="women"
            src="./assets/woman.png"
            sx={{ width: 70, height: 70, ml: "100px", cursor: "pointer" }}
            aria-describedby={id}
            type="button"
            onClick={handleClick}
          />
          <Popper id={id} open={open} anchorEl={anchorEl}>
            <Box
              sx={{
                border: 1,
                p: 1,
                bgcolor: "background.paper",
                borderRadius: "12px",
              }}
            >
              <Stack>My Profile</Stack>
              <Stack>Loan Statement</Stack>
              <Stack>Repayment Schedule</Stack>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  mt: "12px",
                }}
              >
                <Typography variant="body2">Help</Typography>
                <Typography variant="body2">Logout</Typography>
              </Stack>
            </Box>
          </Popper>
          <Typography variant="h4">Welcome to Shakti</Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          transform: "translateY(-50%)",
        }}
      >
        <Stack
          sx={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "2px solid #7165E3",
            width: "140px",
            height: "140px",
            textAlign: "center",
            py: "35px",
            px: "20px",
          }}
        >
          <Typography variant="caption">
            Principal Outstanding Amount
          </Typography>
        </Stack>
        <Stack
          sx={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "2px solid #7165E3",
            width: "140px",
            height: "140px",
            textAlign: "center",
            py: "35px",
            px: "20px",
          }}
        >
          <Typography variant="caption">Due within next 21 Days</Typography>
        </Stack>
        <Stack
          sx={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            border: "2px solid #7165E3",
            width: "140px",
            height: "140px",
            textAlign: "center",
            py: "35px",
            px: "20px",
          }}
        >
          <Typography variant="caption">Previous Paid Amount</Typography>
          <Typography variant="caption">Previous Paid Date</Typography>
        </Stack>
      </Box>
      <Stack
        sx={{
          textAlign: "center",
        }}
      >
        <Typography>Next due date: &nbsp;21/04/2022</Typography>
        <Typography>Amount to be paid: &nbsp; Rs 2000 /-</Typography>
      </Stack>
      <Stack
        sx={{
          my: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Link>I want a Mini statement</Link>
        <Button variant="contained">Pay Now</Button>
      </Stack>
      <Box>
        <Stack
          sx={{
            backgroundColor: "#fff",
            position: "absolute",
            bottom: "0px",
            right: "16px",
            height: "40px",
            width: "650px",
            textAlign: "center",
          }}
        >
          <Typography>
            "Shakti helped me to open a shop in my village and earn" -Devi
          </Typography>
        </Stack>
        <img
          style={{ width: "100%", height: "185px" }}
          src="./assets/devi.png"
          alt="devi"
        />
      </Box>
    </>
  );
};

export default DashboardMain;
