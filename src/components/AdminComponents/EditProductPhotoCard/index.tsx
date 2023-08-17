import {
  Card,
  CardMedia,
  CardActions,
  Button,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";

type Props = {
  imgUrl: string;
  onDelete: () => void;
  showCase: boolean;
  changeShowCase: () => void;
};

const EditProductPhotoCard = (props: Props) => {
  console.log(props);
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia component="img" alt="product_photo" image={props.imgUrl} />
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormControlLabel
          checked={props.showCase}
          onClick={props.changeShowCase}
          control={<Radio />}
          label="Ürün Varsaylan Görseli Seç"
        />
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
