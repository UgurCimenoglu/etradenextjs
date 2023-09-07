import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./page.module.css";

// import required modules
import { Autoplay } from "swiper";
import { ProductCard } from "@/components/ProductCard/index";
import CustomPaper from "../CustomPaper";
import { Container } from "@mui/material";
import { List_Product } from "@/contracts/products/list_product";

type Props = {
  products: List_Product[] | undefined;
};
export default function MostPreferredProducts(props: Props) {
  return (
    <Container maxWidth="xl">
      <CustomPaper title="En Çok Tercih Edilen Ürünler" />
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={30}
        autoplay
        loop={true}
        color="black"
        modules={[Autoplay]}
        className={styles.mySwiper}
      >
        {props.products?.map((item, i) => (
          <SwiperSlide key={i} className={styles.mySwiperSlide}>
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
                  : `/default-product-${Math.floor(Math.random() * 5 + 1)}.png`
              }
              title={item.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
