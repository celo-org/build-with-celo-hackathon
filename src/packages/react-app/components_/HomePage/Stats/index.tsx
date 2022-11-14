import { stats } from "@/data";
import React from "react";
import { Stack, Typography, Box } from "@mui/material";

const Stats = () => {
  return (
    <Box bgcolor="#FBD981" textAlign="center" py={6}>
      <Typography variant="h4" fontWeight={"bold"} sx={{ fontSize: { xs: "40px", md: "auto" } }}>
        {stats.heading}{" "}
      </Typography>
      <p className="text-center text-lg my-5">{stats.subText} </p>
      <Stack justifyContent="space-around"  sx={{ flexDirection: { xs: "column", md: "row" }, marginY: { xs: 4, md: 10 } }}>
        {stats.statistics.map((stat, index) => (
          <Box key={`${stat.number}-${stat.text}-${index}`} sx={{ marginTop: { xs: 4, md: "unset" } }}>
            <Typography variant="h2" fontWeight="bold" >
              {stat.number}{" "}
            </Typography>
            <Typography>{stat.text} </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Stats;
