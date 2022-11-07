import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { CssTextField } from "../CustomTextBox/CustomTextBox";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useRef } from "react";
import { useEffect } from "react";

const CreateEvent = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  console.log(preview);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Box
      sx={{
        minHeight: "80vh",
        background: "linear-gradient(to right, #000 20%, #7228BB)",
      }}
    >
      <Container maxWidth="md">
        <Box color="#fff" sx={{ pt: "3%" }}>
          <Typography
            fontWeight={700}
            fontSize={{ xs: "24px", sm: "36px" }}
            lineHeight="49.03px"
          >
            Basic Info
          </Typography>
          <Typography
            fontSize={{ xs: "20px" }}
            fontWeight={300}
            lineHeight="27.24px"
            color="#D9D9D9 !important"
          >
            Name your event and tell event-goers why they should come. Add
            details that highlight what makes it unique.
          </Typography>
        </Box>
        <Box color="#fff" sx={{ mt: "3%" }}>
          <Typography fontWeight={700}>Event Title :</Typography>
          <CssTextField
            placeholder="Be clear and Descriptive"
            fullWidth
            sx={{ mt: "1%" }}
          />
        </Box>
        <Box color="#fff" sx={{ mt: "3%" }}>
          <Typography fontWeight={700}>Organiser :</Typography>
          <CssTextField
            placeholder="Tell the anttendees who is organising the event"
            fullWidth
            sx={{ mt: "1%" }}
          />
        </Box>
        <Box color="#fff" sx={{ mt: "3%" }}>
          <Typography fontWeight={700}>Description :</Typography>
          <CssTextField
            sx={{ ".MuiFormHelperText-root": { color: "#fff" } }}
            helperText="200 words max"
            multiline
            minRows={4}
            placeholder="Description of the event"
            fullWidth
          />
        </Box>
        <Box color="#fff" sx={{ mt: "3%" }}>
          <Typography fontWeight={700}>Add a Logo :</Typography>
        </Box>
        <Box>
          {preview ? (
            <img
              src={preview}
              style={{
                width: "134px",
                height: "134px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              onClick={() => {
                setImage(null);
              }}
            />
          ) : (
            <Button
              sx={{
                mt: "1%",
                width: "134px",
                height: "134px",
                color: "#000",
                background: "#D9D9D9",
                "&:hover": { background: "#D9D9D9" },
                borderRadius: "50%",
                textTransform: "capitalize",
              }}
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              upload Image
            </Button>
          )}
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </Box>
        <Box color="#fff" sx={{ mt: "3%" }}>
          <Typography fontWeight={700}>Add a Banner Image :</Typography>
          <CssTextField
            sx={{ ".MuiFormHelperText-root": { color: "#fff" } }}
            helperText="200 words max"
            multiline
            minRows={4}
            placeholder="Description of the event"
            fullWidth
          />
        </Box>
      </Container>
    </Box>
  );
};

export default CreateEvent;
