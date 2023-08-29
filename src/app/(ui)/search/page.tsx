"use client";
import { ProductCard } from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/Skeleton/Product/ProductCard";
import { GetProductsByQuery } from "@/services/Products";
import { Container, Grid, Pagination, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SearchQueryPage = () => {
  const searchParams = useSearchParams();

  const q = searchParams?.get("q");

  const { mutate, data, isLoading } = useMutation(GetProductsByQuery, {
    onError: () => {
      toast.error("Ürünler Listelendirken Hata Meydana Geldi");
    },
    onSuccess: (data) => {
      console.log("Ürünler Listelendi.");
    },
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(12);


  useEffect(()=>{console.log("qqq",q)},[q])

  useEffect(() => {
    mutate({ page: 0, size: pageSize, q: q as string });
  }, [q]);

  const changePageHandler = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(value)
    setCurrentPage(value);
    if (q)
      mutate({
        page: value-1,
        size: pageSize,
        q: q,
      });

    window.scrollTo(0, 0); // sayfa her değiştiğinde en yukarı scroll olması için eklendi.
  };

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div>
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <Grid container spacing={2}>
          {data?.products.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={3}>
              <ProductCard
                price={item.price}
                id={item.id}
                imgUrl={
                  (item.productImageFiles?.length as number) > 0 &&
                  item.productImageFiles?.some((x) => x.showCase === true)
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${
                        item.productImageFiles?.find((p) => p.showCase === true)
                          ?.path
                      }`
                    : "/default-product.png"
                }
                title={item.name}
              />
            </Grid>
          ))}
        </Grid>
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <Pagination
            count={Math.ceil((data?.totalCount || 12) / pageSize)}
            variant="outlined"
            shape="rounded"
            onChange={changePageHandler}
            page={currentPage}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default SearchQueryPage;
