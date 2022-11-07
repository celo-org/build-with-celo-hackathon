import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CssTextField } from "../CustomTextBox/CustomTextBox";
import { useRef } from "react";
import { useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const blockchain = [
  {
    value: "Ethereum",
    label: "Ethereum",
  },
  {
    value: "Polygon",
    label: "Polygon",
  },
  {
    value: "Celo",
    label: "Celo",
  },
];

const CreateEvent = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [time, setTime] = useState(dayjs("2022-08-18 T21:11:54"));
  const fileInputRef = useRef();

  const [chain, setChain] = useState("Ethereum");

  const handleChain = (event) => {
    setChain(event.target.value);
  };

  const handleTime = (newTime) => {
    setTime(newTime);
  };

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
        <Box color="#D9D9D9" sx={{ mt: "3%" }}>
          <Typography fontWeight={700}>Event Title :</Typography>
          <CssTextField
            placeholder="Be clear and Descriptive"
            fullWidth
            sx={{ mt: "1%" }}
          />
        </Box>
        <Box color="#D9D9D9" sx={{ mt: "3%" }}>
          <Typography fontWeight={700}>Organiser :</Typography>
          <CssTextField
            placeholder="Tell the anttendees who is organising the event"
            fullWidth
            sx={{ mt: "1%" }}
          />
        </Box>
        <Box color="#D9D9D9" sx={{ mt: "3%" }}>
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
        <Box color="#D9D9D9" sx={{ mt: "3%" }}>
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
        <Box color="#D9D9D9" sx={{ mt: "3%" }}>
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
        <Box>
          <Grid container mt="3%" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box fullWidth>
                <Typography color="#D9D9D9" fontWeight={600}>
                  Blockchain
                </Typography>
                <CssTextField
                  value={chain}
                  onChange={handleChain}
                  select
                  fullWidth
                  sx={{ "	.MuiInputBase-root": { borderRadius: "0px" } }}
                >
                  {blockchain.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box fullWidth>
                <Typography color="#D9D9D9" fontWeight={600}>
                  Category
                </Typography>
                <CssTextField
                  select
                  fullWidth
                  sx={{ "	.MuiInputBase-root": { borderRadius: "0px" } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box fullWidth>
                <Typography color="#D9D9D9" fontWeight={600}>
                  Location
                </Typography>
                <CssTextField
                  fullWidth
                  sx={{ "	.MuiInputBase-root": { borderRadius: "0px" } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box fullWidth>
                <Typography color="#D9D9D9" fontWeight={600}>
                  Venue
                </Typography>
                <CssTextField
                  fullWidth
                  sx={{ "	.MuiInputBase-root": { borderRadius: "0px" } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box fullWidth>
                <Typography color="#D9D9D9" fontWeight={600}>
                  Time and date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={time}
                    onChange={handleTime}
                    renderInput={(params) => (
                      <CssTextField
                        {...params}
                        fullWidth
                        sx={{ "	.MuiInputBase-root": { borderRadius: "0px" } }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "3%",
              pb: "3%",
            }}
          >
            {" "}
            <Button
              sx={{
                width: { xs: "100px", sm: "350px" },
                background: "#D9D9D9",
                "&:hover": { background: "#D9D9D9" },
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateEvent;
