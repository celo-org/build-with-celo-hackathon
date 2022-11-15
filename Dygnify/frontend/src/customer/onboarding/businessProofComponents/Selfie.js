import React, { useRef, useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const Selfie = () => {
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });
  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ color: "#7165E3", textAlign: "center" }}>
          SMILE for a Selfie !
        </Typography>
        <Box
          sx={{
            maxWidth: "408px",
            backgroundColor: "#ffffff",
            my: "28px",
            mx: "auto",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {image === "" ? (
            <Webcam
              audio={false}
              height={200}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
            />
          ) : (
            <img
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                height: "200px",
                width: "280px",
                objectFit: "cover",
              }}
              src={image}
            />
          )}
        </Box>
        <Box
          sx={{
            mx: "auto",
            my: "12px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            sx={{ backgroundColor: "#ffffff", color: "#7165E3" }}
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setImage("");
            }}
          >
            Retake
          </Button>
          <Button
            sx={{ backgroundColor: "#ffffff", color: "#7165E3" }}
            variant="contained"
            onClick={
              image
                ? () => {
                    // handleClick("address");
                  }
                : (e) => {
                    e.preventDefault();
                    capture();
                  }
            }
          >
            {image ? "Upload" : "Capture"}
          </Button>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ mt: "60px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#979797", float: "right" }}
          //   onClick={() => {
          //     handleClick("panUploaded");
          //   }}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default Selfie;
