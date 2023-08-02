import { CircularProgress, SxProps, Theme } from "@mui/material";
import React from "react";

type Props = {
  sx: SxProps<Theme> | undefined;
};
const CircularProgressIcon = (props: Props) => {
  return <CircularProgress sx={props.sx} />;
};

export default CircularProgressIcon;
