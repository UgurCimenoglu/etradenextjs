import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper";
import { ProductCard } from "@/components/ProductCard/index";
import CustomPaper from "../CustomPaper";
import { Container } from "@mui/material";
import { List_Product } from "@/contracts/products/list_product";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type Props = {
  products: List_Product[] | undefined;
};

export default function CampaignProducts(props: Props) {
  return (
    <Container maxWidth="xl">
      <CustomPaper title="Kampanyalı Ürünler" />
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {props.products?.map((item, i) => (
          <SwiperSlide key={i}>
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
