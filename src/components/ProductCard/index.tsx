import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

type ProductCardType = {
  id: string;
  imgUrl: string;
  title?: string;
  content?: string;
  product?: any;
  price?: number;
};

export function ProductCard(props: ProductCardType) {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <Link href={`/products/${props.id}`} style={{ cursor: "pointer" }}>
        <CardMedia
          component="img"
          alt="photo"
          image={props.imgUrl}
          loading="lazy"
          sx={{ height: "350px", objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            AMD Ryzen 5 5600 / ASUS Dual GeForce RTX 4070 OC 12GB WHITE / 16GB
            RAM / 500GB M.2 SSD
          </Typography>
        </CardContent>
      </Link>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <strong>{props.price} ₺</strong>
        <AddToCartButton productId={props.id} />
      </CardActions>
    </Card>
  );
}
