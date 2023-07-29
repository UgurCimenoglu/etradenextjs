"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import useSidebarToggleStore from "@/store/MobileSideBarToggleStore";
import Link from "next/link";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const pages = [
  "Laptop",
  "Masaüstü Bilgisayar",
  "Monitör",
  "Klavye",
  "Anakart",
  "Ekran Kartı",
  "Ekipmanlar",
  "Bilgisayar Bileşenleri",
  "Powered By Asus",
  "Powered By Nvidia",
];

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const { isOpen, openSideBar } = useSidebarToggleStore();
  const { window } = props;

  const handleDrawerToggle = () => {
    openSideBar(isOpen === false ? true : false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar position="static" style={{ boxShadow: "none" }}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: { sm: "flex" },
              justifyContent: { sm: "center", md: "center" },
            }}
          >
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
              }}
            >
              MUI
            </Typography>

            <Box
              sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pages.map((item, i) => (
                <Link key={i} href={"/products"}>
                  <Button sx={{ color: "#fff" }}>{item}</Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={isOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
