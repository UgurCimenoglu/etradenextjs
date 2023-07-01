import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./page.module.css";
import Image from "next/image";
import { Container } from "@mui/material";

const HomeCarousel = () => {
  return (
    <Container maxWidth="xl">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        color="white"
        modules={[Autoplay, Pagination, Navigation]}
        style={{ marginTop: "1rem" }}
      >
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="https://percdn.com/f/706033/cDhXVUoyVTArYkI4Tmk4Z1RvTTZKYms9/i/6479a4714e3bf-44028917.webp"
            alt="photo"
            fill
            className={styles.carouselImg}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="https://www.gaming.gen.tr/wp-content/uploads/2023/05/geforce-rtx-4060-ailesi-banner-20230524-1.jpg"
            alt="photo"
            fill
            className={styles.carouselImg}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="https://www.gaming.gen.tr/wp-content/uploads/2023/06/msi-magazaya-ozel-indirimler-banner-20230607.jpg"
            alt="photo"
            fill
            className={styles.carouselImg}
          />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src="https://www.gaming.gen.tr/wp-content/uploads/2022/12/asus-pba-hazir-sistemler-banner-20221229.jpg"
            alt="photo"
            fill
            className={styles.carouselImg}
          />
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default HomeCarousel;
