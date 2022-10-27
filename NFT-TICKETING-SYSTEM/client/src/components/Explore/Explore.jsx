import {
  Box,
  Button,
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
import create from "../../assets/create.png";

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
            <Grid container spacing={2} mt="2%">
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <EventCard />
              </Grid>
            </Grid>
            <Box
              sx={{
                backgroundImage: `url(${create})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: { xs: "200px", sm: "400px" },
                mt: "4%",
                pt: "2%",
                pl: "1%",
                pr: "2%",
              }}
            >
              <Typography
                color="#fff"
                fontSize={{ xs: "20px", sm: "27px", md: "48px" }}
                fontWeight={900}
              >
                Create Your First NFT Ticket
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: { xs: "120px", sm: "300px", md: "250px" },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    border: "1px solid #fff",
                    "&:hover": { border: "1px solid #fff" },
                    borderRadius: "10px",
                    color: "#fff",
                    textTransform: "capitalize",
                  }}
                >
                  Create Event
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Explore;
