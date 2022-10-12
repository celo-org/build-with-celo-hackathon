import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import music1 from "../../assets/music1.png";
import music2 from "../../assets/music2.png";
import music3 from "../../assets/music3.png";
import food1 from "../../assets/food1.png";
import food2 from "../../assets/food2.png";
import food3 from "../../assets/food3.png";
import create from "../../assets/create.png";

const Category = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000 20%, #7228BB)",

        pt: "5%",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          fontWeight={900}
          fontSize={{ xs: "20px", md: "48px" }}
          color="#fff"
        >
          Browse By Category
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: "100%", borderRadius: "20px" }}>
                <CardMedia component="img" image={music1} />
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: "100%", borderRadius: "20px" }}>
                <CardMedia component="img" image={music2} />
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: "100%", borderRadius: "20px" }}>
                <CardMedia component="img" image={music3} />
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: "100%", borderRadius: "20px" }}>
                <CardMedia component="img" image={food1} />
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: "100%", borderRadius: "20px" }}>
                <CardMedia component="img" image={food2} />
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
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: "100%", borderRadius: "20px" }}>
                <CardMedia component="img" image={food3} />
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
            </Box>
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
      </Container>
    </Box>
  );
};

export default Category;
