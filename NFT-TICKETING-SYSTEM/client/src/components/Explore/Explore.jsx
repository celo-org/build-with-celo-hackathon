import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import React from "react";
import { CssTextField } from "../CustomTextBox/CustomTextBox";
import Sidebar from "../Sidebar/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
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
            <Box>
              <CssTextField
                placeholder="Search for your events"
                inputProps={{
                  sx: {
                    "&::placeholder": {
                      color: "grey",
                    },
                    color: "grey",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <SearchIcon sx={{ color: "red" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                backgroundImage: `url(${create})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: { xs: "200px", sm: "300px" },
              }}
            ></Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Explore;
