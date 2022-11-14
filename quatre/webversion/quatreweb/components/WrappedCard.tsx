import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export const WrappedCard = (props: { heading?:string, content?: string, imageUrl?: string}) => {
  const { heading, content, imageUrl} = props;

  return (
  <Card sx={{ height: 450, cursor: "pointer" }}>
    <CardMedia
      component="img"
      sx={{
        height: 140
        // pt: '56.25%',
      }}
      image={imageUrl}
      alt="r"
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h5" component="h3">
        {heading}
      </Typography>
      <Typography className="text-gray-500 flex justify-start">{content}</Typography>
    </CardContent>
  </Card>
  )
}