import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import useThemeStore from "@/contexts/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import useSidebarToggleStore from "@/contexts/MobileSideBarToggleContext";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeToggle from "../DarkModeToggle";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginLeft: 0,
  width: "80%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "70ch",
      "&:focus": {
        width: "80ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const { isOpen, openSideBar } = useSidebarToggleStore();

  const handleDrawerToggle = () => {
    openSideBar(isOpen === false ? true : false);
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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "inline-block", md: "inline-block" },
              }}
            >
              MUI
            </Typography>
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "20px",
              gap: ".5rem",
            }}
          >
            <DarkModeToggle />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
