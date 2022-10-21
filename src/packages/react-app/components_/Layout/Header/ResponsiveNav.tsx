import * as React from "react";
import { Menu, Close, ExpandMore } from "@mui/icons-material";
import { Box, Drawer, IconButton, Stack, List, ListItem, ListItemText, ListItemButton, Divider } from "@mui/material";
import Image from "next/image";
import { navlinks } from "@/data";
import { useRouter } from "next/router";

export default function ResponsiveNav() {
  const router = useRouter();
  const [expand, setExpand] = React.useState(true);
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setState(open);
  };

  const NavList = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} py={4} onKeyDown={toggleDrawer(false)}>
      <Stack direction="row" justifyContent={"space-between"} px={2}>
        <Image src="/images/Header/SH-Logo.png" width={200} height={50} />
        <IconButton onClick={toggleDrawer(false)}>
          <Close />
        </IconButton>
      </Stack>

      <Divider />
      <List>
        {navlinks.map((navlink, index) => (
          <>
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  navlink.link === "/about"
                    ? window.open("https://gifteas-organization.gitbook.io/savinghistory/", "_blank")
                    : navlink.link !== "/about" && navlink.dropDown === null
                    ? router.push(`${navlink.link}`)
                    : setExpand(false);
                }}
              >
                <ListItemText primary={navlink.title} />
              </ListItemButton>
              {navlink.title === "History" && (
                <IconButton onClick={() => setExpand(!expand)}>
                  <ExpandMore />
                </IconButton>
              )}
            </ListItem>
            {navlink.title === "History" && (
              <>
                <List sx={{ display: expand ? "unset" : "none" }}>
                  {navlink.dropDown.links.map((link) => (
                    <>
                      <Divider />
                      <ListItem key={link.link} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            router.push(`${link.link}`);
                          }}
                        >
                          <ListItemText primary={link.text} />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ))}
                </List>
              </>
            )}
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="responsive-navlinks">
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
          {<NavList />}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
