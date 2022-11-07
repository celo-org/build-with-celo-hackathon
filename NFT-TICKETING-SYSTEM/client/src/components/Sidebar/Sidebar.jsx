import { Box, Button, Chip, Stack, Typography } from "@mui/material";

import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import WorkIcon from "@mui/icons-material/Work";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";

const Sidebar = () => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { xs: "auto", md: "100%" },
        flexDirection: { md: "column" },
        pt: "4%",
      }}
    >
      <Chip
        label="Categories"
        sx={{
          color: "#fff",
          mb: { xs: 0, md: "10%" },
          mr: { xs: "2%", md: 0 },
        }}
        variant="outlined"
      />
      <Chip
        icon={<LibraryMusicIcon />}
        label="Music"
        sx={{
          color: "#fff",
          mb: { xs: 0, md: "10%" },
          mr: { xs: "2%", md: 0 },
        }}
        variant="outlined"
      />
      <Chip
        icon={<EmojiFoodBeverageIcon />}
        label="Food and Drinks"
        sx={{
          color: "#fff",
          mb: { xs: 0, md: "10%" },
          mr: { xs: "2%", md: 0 },
        }}
        variant="outlined"
      />
      <Chip
        icon={<WorkIcon />}
        label="Business"
        sx={{
          color: "#fff",
          mb: { xs: 0, md: "10%" },
          mr: { xs: "2%", md: 0 },
        }}
        variant="outlined"
      />
      <Chip
        icon={<SportsHandballIcon />}
        label="Sports and Fitness"
        sx={{
          color: "#fff",
          mb: { xs: 0, md: "10%" },
          mr: { xs: "2%", md: 0 },
        }}
        variant="outlined"
      />
      <Chip
        icon={<LocalAirportIcon />}
        label="Travel and Adventure"
        sx={{ color: "#fff" }}
        variant="outlined"
      />
    </Stack>
  );
};

export default Sidebar;
