import useThemeStore from "@/store/ThemeStore";
import { IconButton } from "@mui/material";
import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeToggle = () => {
  const { changeTheme, theme } = useThemeStore();
  const changeCurrentTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <IconButton
      size="large"
      aria-label="dark-light theme"
      color="inherit"
      onClick={changeCurrentTheme}
    >
      <DarkModeSwitch
        onChange={() => {}}
        sunColor="#ffd800"
        moonColor="white"
        checked={theme === "dark" ? true : false}
        style={{ cursor: "pointer" }}
      />
    </IconButton>
  );
};

export default DarkModeToggle;
