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

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function CampaignProducts() {
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
        {arr.map((a, i) => (
          <SwiperSlide key={i}>
            <ProductCard
              id={"s"}
              imgUrl="https://www.gaming.gen.tr/wp-content/uploads/2023/05/asus-tuf-gaming-gt301-gaminggentr-edition-rgb-temperli-cam-usb-3-2-mid-tower-kasa-600x600.jpg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
