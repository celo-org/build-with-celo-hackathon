import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import food2 from "../../assets/food2.png";
import food3 from "../../assets/food3.png";
import create from "../../assets/create.png";

const EventCard = () => {
  return (
    <Card sx={{ maxWidth: "250px" }}>
      <CardMedia component="img" image={food2} />
      <CardContent
        sx={{
          background: "linear-gradient(261.33deg, #1A092C 0%, #BE68F1 100%)",
          height: "5px",
        }}
      >
        <Typography color="#fff">Test event</Typography>
      </CardContent>
    </Card>
  );
};

export default EventCard;
