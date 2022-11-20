import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Box, Button, Typography, Stack, Link } from "@mui/material";

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const Photo = ({ handleClick }) => {
  const [image, setImage] = useState("");
  const webcamRef = useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  });

  return (
    <>
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
        {image == "" ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            //   videoConstraints={videoConstraints}
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
      <Typography
        sx={{ textAlign: "center", color: "#ffffff" }}
        variant="body1"
      >
        Frame your face properly
      </Typography>
      <Stack
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
                  handleClick("address");
                }
              : (e) => {
                  e.preventDefault();
                  capture();
                }
          }
        >
          {image ? "Upload" : "Capture"}
        </Button>
      </Stack>
    </>
  );
};

export default Photo;
