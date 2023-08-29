"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import { Button, CircularProgress, IconButton } from "@mui/material";
import useSidebarToggleStore from "@/store/MobileSideBarToggleStore";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeToggle from "../DarkModeToggle";
import Link from "next/link";
import ShoppingCartToggle from "../ShoppingCart";
import { signOut, useSession } from "next-auth/react";
import NavbarSearch from "./Search";
import RightContent from "./RightContent";

export default function SearchAppBar() {
  const { isOpen, openSideBar } = useSidebarToggleStore();

  const { data, status } = useSession();

  const handleDrawerToggle = () => {
    openSideBar(isOpen === false ? true : false);
  };

  const HandleLogOut = () => {
    signOut();
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ boxShadow: "none" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Link href={"/"} style={{ color: "inherit" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "none",
                    sm: "inline-block",
                    md: "inline-block",
                  },
                }}
              >
                UGUR
              </Typography>
            </Link>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <NavbarSearch />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <DarkModeToggle />
            {status === "authenticated" && <ShoppingCartToggle />}
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              {status === "loading" ? (
                <CircularProgress color="inherit" />
              ) : status === "authenticated" ? (
                <AccountCircle onClick={HandleLogOut} />
              ) : (
                <Link href={"/login"}>Giriş Yap</Link>
              )}
            </IconButton> */}
            {status === "loading" && <CircularProgress color="inherit" />}
            {status === "authenticated" && <RightContent />}
            {status === "unauthenticated" && (
              <Link href={"/admin/login"}>
                <Button color="inherit">Giriş Yap</Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
