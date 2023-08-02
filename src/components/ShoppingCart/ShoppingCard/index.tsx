"use client";
import {
  GetCurrentBasket,
  UpdateQuantity,
  DeleteProductFromBasket,
} from "@/services/Basket";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styles from "./page.module.css";

type Props = {
  setTotalPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const ShoppingCards = (props: Props) => {
  const basket = useMutation(GetCurrentBasket);
  const updateQty = useMutation(UpdateQuantity);
  const removeProduct = useMutation(DeleteProductFromBasket);

  const handleGetBasket = async () => {
    props.setTotalPrice(undefined);
    const currentBasket = await basket.mutateAsync();
    const totalPrice = currentBasket
      ?.map((x) => x.price * x.quantity)
      .reduce((acc, currentValue) => acc + currentValue, 0);
    props.setTotalPrice(totalPrice);
  };
  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    basketItemId: string
  ) => {
    updateQty.mutateAsync({
      basketItemId: basketItemId,
      quantity: Number(e.target.value),
    });
    await handleGetBasket();
  };
  const handleDeleteProductToBasket = async (basketItemId: string) => {
    await removeProduct.mutateAsync({ basketItemId: basketItemId });
    await handleGetBasket();
  };

  useEffect(() => {
    handleGetBasket();
  }, []);

  return (
    <>
      {(basket.isLoading || updateQty.isLoading) && (
        <CircularProgress
          sx={{ top: "30%", left: "50%", position: "absolute" }}
        />
      )}

      {basket.isSuccess && !updateQty.isLoading && (
        <div style={{ overflowY: "auto" }}>
          {basket.data?.map((p, i) => (
            <Card className={styles.card} key={i}>
              <CardMedia
                component="img"
                sx={{ width: "100px", objectFit: "scale-down" }}
                image={
                  p.image
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${p.image}`
                    : "/default-product.png"
                }
                alt="product_photo"
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <CardContent sx={{ padding: 0, marginLeft: 1 }}>
                  <Typography component="div" variant="subtitle1">
                    {p.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                  >
                    Description
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Typography variant="subtitle2" color="inherit">
                      Adet:
                    </Typography>
                    <TextField
                      id="outlined-number"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      size="small"
                      sx={{ maxWidth: 100 }}
                      defaultValue={p.quantity}
                      onChange={(e) => handleQuantityChange(e, p.basketItemId)}
                    />
                  </div>
                  <IconButton
                    size="medium"
                    aria-label="dark-light theme"
                    color="inherit"
                    onClick={(e) => handleDeleteProductToBasket(p.basketItemId)}
                    sx={{ marginLeft: "10px" }}
                  >
                    <Delete fontSize="medium" />
                  </IconButton>
                </CardActions>
              </Box>
            </Card>
          ))}
        </div>
      )}

      {(!!basket.error || !!updateQty.error) && <p>Hata</p>}
    </>
  );
};

export default ShoppingCards;
