import { Card, CardMedia, CardActions, Button } from "@mui/material";
import React from "react";

type Props = {
  imgUrl: string;
  onDelete: () => void;
};

const EditProductPhotoCard = (props: Props) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.imgUrl}
      />
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="small">Share</Button>
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={props.onDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProductPhotoCard;
