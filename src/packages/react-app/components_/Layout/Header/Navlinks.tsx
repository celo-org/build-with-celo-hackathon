import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { Stack, Button, Menu, MenuItem, Divider, MenuProps, Box } from "@mui/material";
import { navlinks } from "../../../data";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Navlinks = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" className="nav-links">
      {navlinks.map((navlink, index) => (
        <Box key={index} ml={2}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableElevation
            disableRipple
            onClick={(e) => {
              navlink.link === "/about"
                ? window.open("https://gifteas-organization.gitbook.io/savinghistory/", "_blank")
                : navlink.link !== "/about" && navlink.dropDown === null
                ? router.push(`${navlink.link}`)
                : handleClick(e);
            }}
            endIcon={navlink.dropDown !== null && <KeyboardArrowDown />}
            sx={{ color: `${router.pathname === navlink.link ? "#F8B60C" : "#312d22"}`, textTransform: "capitalize" }}
          >
            {navlink.title}
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <Link href="/history/open-proposal">
                <a style={{ textDecoration: "none" }}>Open Proposal</a>
              </Link>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <Link href="/history/browse-proposal">
                <a style={{ textDecoration: "none" }}>Browse Proposal</a>
              </Link>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <Link href="/history/browse-history">
                <a style={{ textDecoration: "none" }}>Browse History</a>
              </Link>
            </MenuItem>
          </StyledMenu>
        </Box>
      ))}
           <a href="https://github.com/Giftea/savingHistory" target="_blank">
        <Image src="/images/Header/github-icon.png" width={24} height={24} />
      </a>
    </Stack>
  );
};

export default Navlinks;

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));
