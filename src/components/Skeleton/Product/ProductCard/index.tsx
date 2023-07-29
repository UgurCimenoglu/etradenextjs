import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Skeleton,
} from "@mui/material";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: "2rem" }}>
      <Grid container spacing={2}>
        {Array.from(new Array(12)).map((d, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Card
              key={i}
              sx={{ width: "100%", height: "100%", cursor: "pointer" }}
            >
              <Skeleton variant="rectangular" height={"320px"} />

              <CardContent>
                <Skeleton variant="text" width={"50%"} height={"50px"} />
                <Skeleton variant="text" width={"100%"} height={"50px"} />
                <Skeleton variant="text" width={"100%"} height={"50px"} />
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <Skeleton variant="text" width={"100px"} height={"50px"} />
                <Skeleton variant="text" width={"100px"} height={"50px"} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductCardSkeleton;
