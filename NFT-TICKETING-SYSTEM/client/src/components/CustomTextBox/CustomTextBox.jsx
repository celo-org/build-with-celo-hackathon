import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1C1B2D",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "#1C1B2D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1C1B2D",
    },
  },
  ".MuiInputBase-root": {
    backgroundColor: "#fff",
    borderRadius: "20px",
  },
});
