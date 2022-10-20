import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { CssTextField } from "../CustomTextBox/CustomTextBox";
import Sidebar from "../Sidebar/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import event from "../../assets/event.png";
import EventCard from "./EventCard";

const Explore = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000 20%, #7228BB)",
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="xl">
        <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
          <Box
            sx={{
              minHeight: { xs: "auto", md: "70vh" },
              borderRight: "1px solid #3d3d3d",
              px: { xs: 0, md: 2 },
            }}
          >
            <Sidebar />
          </Box>

          <Box p={2} sx={{ overflowY: "auto", minHeight: "70vh", flex: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CssTextField
                size="small"
                placeholder="Search for your events"
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "#7228BB",
                    },
                    color: "#7228BB",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SearchIcon sx={{ color: "#7228BB" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box color="#fff">
              <Typography
                fontWeight={400}
                fontSize={{ xs: "20px", sm: "32px" }}
              >
                Event of the Month
              </Typography>
            </Box>
            <Box
              sx={{
                borderRadius: "10px",
                backgroundImage: `url(${event})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: { xs: "200px", sm: "300px" },
              }}
            ></Box>
            <Grid container spacing={1} mt="2%">
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <EventCard />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Explore;
