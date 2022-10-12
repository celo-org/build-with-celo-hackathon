import { Box, Container, Grid, Typography } from "@mui/material";
import dot from "../../assets/dot.svg";
import circle from "../../assets/circle.svg";

const Purpose = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #000 20%, #7228BB)",
        pb: "5%",
        pt: "5%",
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src={dot} />
              <Typography
                color="#fff"
                fontWeight={400}
                lineHeight="24.2px"
                fontSize={{ xs: "16px", md: "20px" }}
              >
                Makes it easy for you to collect memories of your special
                moments. Always keep your memories alive.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: "4%" }}>
              <img src={dot} />
              <Typography
                color="#fff"
                fontWeight={400}
                lineHeight="24.2px"
                fontSize={{ xs: "16px", md: "20px" }}
              >
                Guarantees trust. You’ll never buy fake or forged tickets. The
                authenticity of each ticket is tied to the owner.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: "4%" }}>
              <img src={dot} />
              <Typography
                color="#fff"
                fontWeight={400}
                lineHeight="24.2px"
                fontSize={{ xs: "16px", md: "20px" }}
              >
                Allow you to be part of the event organizer’s community and be
                eligible to receive NFT ticket airdrops.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: "4%" }}>
              <img src={dot} />
              <Typography
                color="#fff"
                fontWeight={400}
                lineHeight="24.2px"
                fontSize={{ xs: "16px", md: "20px" }}
              >
                You can buy and sell rare tickets that collectors desire, or
                sell NFT for upcoming events and earn incentives from
                organizers.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "6%",
            }}
          >
            <Box sx={{ display: "flex", transform: "rotate(50deg)" }}>
              <Box>
                <Box
                  sx={{
                    backgroundImage: `url(${circle})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: { xs: "100px", md: "200px" },
                    height: { xs: "100px", md: "200px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="#fff" sx={{ transform: "rotate(-50deg)" }}>
                    Memories
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundImage: `url(${circle})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: { xs: "100px", md: "200px" },
                    height: { xs: "100px", md: "200px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="#fff" sx={{ transform: "rotate(-50deg)" }}>
                    Authenticity
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    backgroundImage: `url(${circle})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: { xs: "100px", md: "200px" },
                    height: { xs: "100px", md: "200px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="#fff" sx={{ transform: "rotate(-50deg)" }}>
                    AirDrops
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundImage: `url(${circle})`,
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: { xs: "100px", md: "200px" },
                    height: { xs: "100px", md: "200px" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography color="#fff" sx={{ transform: "rotate(-50deg)" }}>
                    Resale
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Purpose;
