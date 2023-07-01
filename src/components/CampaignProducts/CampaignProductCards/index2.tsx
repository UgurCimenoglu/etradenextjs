import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import styles from "./page2.module.css";

// import required modules
import { Autoplay } from "swiper";
import { ImgMediaCard } from ".";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        autoplay
        loop={true}
        color="black"
        modules={[Autoplay]}
        className={styles.mySwiper}
      >
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>
          <ImgMediaCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
