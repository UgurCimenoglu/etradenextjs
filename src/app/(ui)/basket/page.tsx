"use client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ShoppingCards from "@/components/ShoppingCart/ShoppingCard";
import CreateOrderDialog from "@/components/CustomDialog/CreateOrderDialog";

const Basket = () => {
  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined);
  return (
    <Container maxWidth="xl" sx={{ mt: "2rem", margin: "auto" }}>
      <Grid container sx={{ justifyContent: "center" }} spacing={3}>
        <Grid item xs={12} md={6}>
          <ShoppingCards setTotalPrice={setTotalPrice} />
        </Grid>
        <Grid item xs={12} md={3}>
          {!!totalPrice && (
            <Card sx={{ margin: "1rem" }}>
              <CardContent>
                <Typography component="div" variant="h6">
                  Alışverişi Tamamla
                </Typography>
                <Typography variant="body1" component="div" margin={"5px 0"}>
                  Kargo : Bedava
                </Typography>
                <Typography variant="body1" component="div" margin={"5px 0"}>
                  Kampanya: -
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 5px",
                }}
              >
                <Typography variant="body1" component="div">
                  Toplam :{totalPrice}₺
                </Typography>
                <CreateOrderDialog />
              </CardActions>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Basket;
