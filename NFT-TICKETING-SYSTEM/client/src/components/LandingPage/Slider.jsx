import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import sauti from "../../assets/sauti.png";
import bb from "../../assets/bb.png";
import centomy from "../../assets/centomy.png";

const Slider = () => {
  let responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
    1024: {
      items: 3,
    },
  };

  let items = [
    <Box>
      <Card sx={{ maxWidth: 396, borderRadius: "20px" }}>
        <CardMedia component="img" image={sauti} />
        <CardContent
          sx={{
            backgroundColor: " #1A092C",
            display: "flex",
            justifyContent: "center",
            mt: "-20px",
          }}
        >
          <Typography color="#fff" fontWeight={500} fontSize="32px">
            Sol Fest
          </Typography>
        </CardContent>
      </Card>
    </Box>,
    <Box>
      <Card sx={{ maxWidth: 396, borderRadius: "20px" }}>
        <CardMedia component="img" image={bb} />
        <CardContent
          sx={{
            backgroundColor: " #1A092C",
            display: "flex",
            justifyContent: "center",
            mt: "-20px",
          }}
        >
          <Typography color="#fff" fontWeight={500} fontSize="32px">
            Sol Fest
          </Typography>
        </CardContent>
      </Card>
    </Box>,
    <Box>
      <Card sx={{ maxWidth: 396, borderRadius: "20px" }}>
        <CardMedia component="img" image={centomy} />
        <CardContent
          sx={{
            backgroundColor: " #1A092C",
            display: "flex",
            justifyContent: "center",
            mt: "-20px",
          }}
        >
          <Typography color="#fff" fontWeight={500} fontSize="32px">
            Sol Fest
          </Typography>
        </CardContent>
      </Card>
    </Box>,
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000 20%, #7228BB)",
        pt: "5%",
      }}
    >
      <Container maxWidth="xl">
        <Box>
          <Typography
            fontSize={{ xs: "22px", sm: "30px", md: "48px" }}
            fontWeight={900}
            color="#fff"
          >
            New Events
          </Typography>
        </Box>
        <Box>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Slider;
