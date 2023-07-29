"use client";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import ProductDetailSkeleton from "@/components/Skeleton/Product/ProductDetail";
import { GetProductById, GetProductImageById } from "@/services/Products";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Container, Paper, Tab } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ProductDetail = ({ params }: any) => {
  console.log(params);

  const productDetail = useQuery({
    queryKey: ["ProductDetail"],
    queryFn: async () => await GetProductById({ id: params.id }),
  });

  const productImage = useQuery({
    queryKey: ["ProductImage"],
    queryFn: async () => await GetProductImageById({ id: params.id }),
  });

  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (productDetail.isLoading) return <ProductDetailSkeleton />;
  if (productDetail.error) return <p>Hata</p>;
  return (
    <Container maxWidth="xl">
      <Paper sx={{ marginTop: "2rem" }}>
        <div style={{ display: "flex", marginBottom: "2rem" }}>
          <div style={{ width: "40%" }}>
            <ProductImageCarousel
              paths={productImage.data?.map((x) => x.path)}
            />
          </div>
          <div style={{ width: "100%", marginLeft: "2rem", marginTop: "2rem" }}>
            <h1>{productDetail.data?.name}</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At quis
              doloremque enim mollitia modi placeat necessitatibus
            </p>
            <p>
              <strong>{productDetail.data?.price}</strong>₺
            </p>
            <Button variant="outlined" color="inherit">
              Sepete ekle
            </Button>
          </div>
        </div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Teknik Özellikler" value="1" />
              <Tab label="Açıklama" value="2" />
              <Tab label="Taksit Seçenekleri" value="3" />
            </TabList>
          </Box>
          <TabPanel sx={{ paddingBottom: "25rem" }} value="1">
            Teknik Özellikler
          </TabPanel>
          <TabPanel sx={{ paddingBottom: "25rem" }} value="2">
            Açıklama
          </TabPanel>
          <TabPanel sx={{ paddingBottom: "25rem" }} value="3">
            Taksit Seçenekleri
          </TabPanel>
        </TabContext>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
