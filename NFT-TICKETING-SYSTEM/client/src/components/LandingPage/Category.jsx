import React from "react";
import {
  Box,
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
      </Container>
    </Box>
  );
};

export default Category;
