import { useRef, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { getOCRFetch } from '../../../services/serviceHelper';

const PanUpload = ({ handleClick }) => {
  const [selectedFile, setSelectedFile] = useState();
  // Reference to the hidden file input element
  const hiddenFileInput = useRef(null);
  // Handle upload button click
  const handleUploadClick = event => {
    hiddenFileInput.current.click();
  };

  // Handle file selection
  const handleChange = async (event) => {
    const res = await getOCRFetch(event.target.files[0], '');
    console.log(res);
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#7165E3",
          }}
        >
          Please Upload your PAN Card
        </Typography>
        <img
          src="./assets/upload.png"
          alt=""
          style={{
            backgroundColor: "#7165E3",
            width: "72px",
            height: "72px",
            objectFit: "contain",
            borderRadius: "12px",
            cursor: "pointer",
          }}
          onClick={handleUploadClick}
        />
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <Button variant="contained" sx={{ backgroundColor: "#7165E3" }}>
          Verify
        </Button>
      </Box>
      <Container maxWidth="md" sx={{ mt: "260px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#979797", float: "right" }}
          onClick={() => { handleClick("panUploaded") }}
        >
          Next
        </Button>
      </Container>
    </>
  );
};

export default PanUpload;
