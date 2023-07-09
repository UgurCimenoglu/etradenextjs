"use client";
import { ProductCard } from "@/components/ProductCard";
import { GetProducts } from "@/services/Products";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";

const Product = () => {
  const { mutate, data } = useMutation(GetProducts, {
    onError: () => {
      alert("Ürünler Listelendirken Hata Meydana Geldi");
    },
    onSuccess: () => {
      console.log("Ürünler Listelendi.");
    },
  });
  useEffect(() => {
    mutate({ page: 0, size: 12 });
  }, []);

  const changePageHandler = (page: number) => {
    mutate({ page, size: 12 });
  };
  return (
    <div>
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <Grid container spacing={2}>
          {data?.products.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <ProductCard
                imgUrl={
                  (item.productImageFiles?.length as number) > 0
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${
                        item.productImageFiles?.find((p) => p.showCase === true)
                          ?.path
                      }`
                    : "/default-product.png"
                }
              />
            </Grid>
          ))}
        </Grid>
        <button onClick={() => changePageHandler(1)}>2.Sayfa</button>
        <button onClick={() => changePageHandler(0)}>1.Sayfa</button>
      </Container>
    </div>
  );
};

export default Product;
