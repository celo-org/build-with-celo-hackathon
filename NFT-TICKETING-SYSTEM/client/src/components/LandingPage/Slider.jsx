import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import sauti from "../../assets/sauti.png";
import bb from "../../assets/bb.png";
import centomy from "../../assets/centomy.png";
import right from "../../assets/arrowRight.svg";
import left from "../../assets/arrowLeft.svg";

const Slider = () => {
  let responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
    1024: {
      items: 4,
    },
  };

  let items = [
    <Box>
      <Card sx={{ maxWidth: "98%", borderRadius: "20px" }}>
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
      <Card sx={{ maxWidth: "98%", borderRadius: "20px" }}>
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
      <Card sx={{ maxWidth: "98%", borderRadius: "20px" }}>
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

        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          responsive={responsive}
          autoPlay
          controlsStrategy="responsive"
          items={items}
          renderNextButton={() => {
            return (
              <IconButton
                sx={{ position: "absolute", left: 0, top: "30%", pl: 4 }}
              >
                <img src={left} alt="" />
              </IconButton>
            );
          }}
          renderPrevButton={() => {
            return (
              <IconButton
                sx={{ position: "absolute", right: 0, top: "30%", pr: 4 }}
              >
                <img src={right} alt="" />
              </IconButton>
            );
          }}
        />
      </Container>
    </Box>
  );
};

export default Slider;
