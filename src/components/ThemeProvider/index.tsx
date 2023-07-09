"use client";
import React from "react";
import {
  CssBaseline,
  PaletteOptions,
  Theme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  grey,
  green,
  red,
  yellow,
  blueGrey,
  lightBlue,
  blue,
  common,
} from "@mui/material/colors";
import useThemeStore from "@/store/ThemeStore";

const MyThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;

const getTheme = (theme: "dark" | "light"): Theme => {
  var customTheme = createTheme({
    palette: theme === "dark" ? darkPalette : lightPalette,
    typography: {
      fontFamily: ["Archivo Variable", "sans-serif"].join(","),
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 1300,
        // this is to be used in complex animations
        complex: 1375,
        // recommended when something is entering screen
        enteringScreen: 1225,
        // recommended when something is leaving screen
        leavingScreen: 1195,
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            "&:-webkit-autofill": {
              "WebkitBoxShadow": `0 0 0 100px ${
                theme === "dark" ? "#6F6F6F" : "var(--primary-weak)"
              } inset`,
              "WebkitTextFillColor": "var(--text-primary)",
            },
          },
        },
      },
    },
  });

  return customTheme;
};

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: grey[400],
  },
  secondary: {
    main: blueGrey[500],
  },
  success: {
    main: green[500],
  },
  error: {
    main: red[700],
  },
  warning: {
    main: yellow[800],
  },
  background: {
    default: grey[900],
    paper: grey[900],
  },
};

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: grey[600],
  },
  secondary: {
    main: blueGrey[500],
  },
  success: {
    main: green[900],
  },
  error: {
    main: red[900],
  },
  warning: {
    main: yellow[900],
  },
  background: {
    default: grey[100],
    paper: common.white,
  },
  // text: {
  //   primary: yellow[900],
  //   secondary: yellow[900],
  //   disabled: yellow[900],
  // },
};
