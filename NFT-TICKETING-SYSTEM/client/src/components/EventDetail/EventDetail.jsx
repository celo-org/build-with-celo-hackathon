import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import create from "../../assets/create.png";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import VerifiedIcon from "@mui/icons-material/Verified";

const EventDetail = () => {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "linear-gradient(to right, #000 20%, #7228BB)",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ pt: "3%" }}>
          <Card sx={{ background: "inherit" }} elevation={0}>
            <CardMedia component="img" height={400} image={create} alt="" />
            <CardContent sx={{ background: "inherit", color: "#fff" }}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography
                      fontSize={{ xs: "20px", sm: "32px" }}
                      fontWeight={700}
                    >
                      SOL FEST NOVEMBER 2022 <VerifiedIcon />
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box>
                    <IconButton>
                      <TwitterIcon sx={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton>
                      <FacebookIcon sx={{ color: "#fff" }} />
                    </IconButton>
                    <IconButton>
                      <InstagramIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus
                dui, suscipit lectus dictum sed blandit. Sit tristique viverra
                ac neque viverra vulputate. Leo facilisi eu, bibendum egestas
                dictum neque eleifend. Pulvinar ut laoreet netus quisque eu
                ornare.
              </Typography>
              <Box
                color="#fff"
                sx={{
                  mt: "3%",
                  display: "flex",
                  justifyContent: "space-between",
                  width: { xs: "100%", md: "50%" },
                }}
              >
                <Stack>
                  <Typography
                    fontSize="20px"
                    fontWeight={700}
                    lineHeight="27.24px"
                  >
                    2.6k
                  </Typography>
                  <Typography>Tickets</Typography>
                </Stack>
                <Stack>
                  <Typography
                    fontSize="20px"
                    fontWeight={700}
                    lineHeight="27.24px"
                  >
                    1.6k
                  </Typography>
                  <Typography>Owners</Typography>
                </Stack>
                <Stack>
                  <Typography
                    fontSize="20px"
                    fontWeight={700}
                    lineHeight="27.24px"
                  >
                    $25
                  </Typography>
                  <Typography>Best Price</Typography>
                </Stack>
                <Stack>
                  <Typography
                    fontSize="20px"
                    fontWeight={700}
                    lineHeight="27.24px"
                  >
                    4
                  </Typography>
                  <Typography>Rarities</Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
          <Box
            color="#fff"
            sx={{ display: "flex", justifyContent: "center", mb: "3%" }}
          >
            <Typography fontWeight={700} fontSize="24px">
              Choose Rarity
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(225deg, #7228BB 0%, rgba(151, 109, 220, 0) 65.42%)",
                  boxShadow: "0px 4px 15px 5px rgba(151, 109, 220, 0.35)",
                  borderRadius: "20px",
                  width: "250px",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  color="#fff"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography fontWeight={700} fontSize="24px">
                    REGULAR
                  </Typography>
                  <Typography fontWeight={700} fontSize="32px">
                    1.83K
                  </Typography>
                  <Typography fontWeight={400} fontSize="20px">
                    $ 25
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(225deg, #7228BB 0%, rgba(151, 109, 220, 0) 65.42%)",
                  boxShadow: "0px 4px 15px 5px rgba(151, 109, 220, 0.35)",
                  borderRadius: "20px",
                  width: "250px",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  color="#fff"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography fontWeight={700} fontSize="24px">
                    VIP
                  </Typography>
                  <Typography fontWeight={700} fontSize="32px">
                    500
                  </Typography>
                  <Typography fontWeight={400} fontSize="20px">
                    $ 55
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(225deg, #7228BB 0%, rgba(151, 109, 220, 0) 65.42%)",
                  boxShadow: "0px 4px 15px 5px rgba(151, 109, 220, 0.35)",
                  borderRadius: "20px",
                  width: "250px",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  color="#fff"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography fontWeight={700} fontSize="24px">
                    REGULAR
                  </Typography>
                  <Typography fontWeight={700} fontSize="32px">
                    1.83K
                  </Typography>
                  <Typography fontWeight={400} fontSize="20px">
                    $ 25
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(225deg, #7228BB 0%, rgba(151, 109, 220, 0) 65.42%)",
                  boxShadow: "0px 4px 15px 5px rgba(151, 109, 220, 0.35)",
                  borderRadius: "20px",
                  width: "250px",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  color="#fff"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography fontWeight={700} fontSize="24px">
                    REGULAR
                  </Typography>
                  <Typography fontWeight={700} fontSize="32px">
                    1.83K
                  </Typography>
                  <Typography fontWeight={400} fontSize="20px">
                    $ 25
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            mt="4%"
            sx={{ display: "flex", justifyContent: "center", pb: "10%" }}
          >
            <Button
              sx={{
                color: "#fff",
                background:
                  "linear-gradient(180deg, #7228BB 0%, rgba(151, 109, 220, 0.35) 100%)",
                boxShadow: "0px 0px 20px #7228BB",
                backdropFilter: "blur(75px)",
                borderRadius: "35px",
                textTransform: "capitalize",
                width: "179px",
                fontSize: "24px",
                fontWeight: 600,
                lineHeight: "33px",
              }}
            >
              Get Ticket
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EventDetail;
