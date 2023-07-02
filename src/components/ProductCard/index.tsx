import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ProductCardType = {
  imgUrl: string;
  title?: string;
  content?: string;
  product?: any;
};

export function ProductCard(props: ProductCardType) {
  return (
    <Card sx={{ width: "100%", height: "100%",cursor:"pointer" }}>
      <CardMedia component="img" alt="photo" image={props.imgUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
