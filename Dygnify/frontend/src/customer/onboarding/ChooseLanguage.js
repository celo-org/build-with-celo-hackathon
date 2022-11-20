import React from "react";
import { Box, Stack, Container, Button, Typography, Grid } from "@mui/material";

const Item = ({ path, name }) => {
  return (
    <Box
      sx={{
        border: "1px solid #000000",
        borderRadius: "12px",
        width: "90px",
        height: "90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={path} alt="" />
      <Typography>{name}</Typography>
    </Box>
  );
};

const ChooseLanguage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#7165E3",
          height: "140px",
          textAlign: "center",
          pt: "35px",
          color: "#ffffff",
          borderEndStartRadius: "12px",
          borderEndEndRadius: "12px",
        }}
      >
        <Stack
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Choose Language</Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            mx: "auto",
          }}
        >
          Please choose a language below
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mx: "auto",
          }}
        >
          You can always change language from profile settings later
        </Typography>
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          mt: "50px",
          textAlign: "center",
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={4}>
            <Item path="./assets/hindiLetter.png" name="Hindi"></Item>
          </Grid>
          <Grid item xs={4}>
            <Item path="./assets/englishLetter.png" name="English"></Item>
          </Grid>
          <Grid item xs={4}>
            <Item path="./assets/odiaLetter.png" name="Odia"></Item>
          </Grid>
          <Grid item xs={4}>
            <Item path="./assets/kannadaLetter.png" name="Kannada"></Item>
          </Grid>
          <Grid item xs={4}>
            <Item path="./assets/tamilLetter.png" name="Tamil"></Item>
          </Grid>
          <Grid item xs={4}>
            <Item path="./assets/bengaliLetter.png" name="Bengali"></Item>
          </Grid>
        </Grid>
      </Container>
      <Container
        maxWidth="sm"
        sx={{
          mt: "56px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "#7165E3",
            float: "right",
          }}
        >
          Continue
        </Button>
      </Container>
    </>
  );
};

export default ChooseLanguage;
