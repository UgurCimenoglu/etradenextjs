import { Box, Paper, SxProps, Theme } from "@mui/material";
import React from "react";
import styles from "./page.module.css";

type CustomPaperType = {
  boxStyle?: SxProps<Theme>;
  title: string;
  elevation?: number;
};

const CustomPaper = (props: CustomPaperType) => {
  return (
    <Box
      sx={
        props.boxStyle || {
          width: "100%",
          height: "auto",
          mt: "2rem",
          mb: "1rem",
          mx: "0",
        }
      }
    >
      <Paper
        elevation={props.elevation || 4}
        variant="elevation"
        className={styles.campaingTitlePaper}
      >
        <div>
          <h2>{props.title}</h2>
        </div>
      </Paper>
    </Box>
  );
};

export default CustomPaper;
