import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Navdrawer = ({ open, setOpen }) => {
  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <Drawer
        anchor="top"
        variant="temporary"
        open={open}
        onClick={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: "linear-gradient(to left, #000 20%, #7228BB)",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Stack spacing={4}>
            <Typography>Explore</Typography>

            <Typography>Resources</Typography>

            <Typography>Memberships</Typography>

            <Typography>Accounts</Typography>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navdrawer;
