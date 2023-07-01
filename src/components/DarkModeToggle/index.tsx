import useThemeStore from "@/contexts/ThemeContext";
import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeToggle = () => {
  const { changeTheme, theme } = useThemeStore();
  const changeCurrentTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <DarkModeSwitch
      onChange={changeCurrentTheme}
      sunColor="#ffd800"
      moonColor="white"
      checked={theme === "dark" ? true : false}
      style={{ cursor: "pointer" }}
    />
  );
};

export default DarkModeToggle;
