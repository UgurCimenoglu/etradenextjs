import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./page.module.css";
import Image from "next/image";

type Props = {
  paths: string[] | undefined;
};

const ProductImageCarousel = (props: Props) => {
  console.log(props);
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      autoplay
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      color="inherit"
      modules={[Autoplay, Pagination, Navigation]}
    >
      {props.paths && props.paths?.length > 0 ? (
        props.paths?.map((p, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            <Image
              src={p}
              alt={p}
              fill
              className={styles.carouselImg}
              unoptimized
            />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide className={styles.swiperSlide}>
          <Image
            src={`/default-product-${Math.floor(Math.random() * 5 + 1)}.png`}
            alt="default_photo"
            fill
            className={styles.carouselImg}
            unoptimized
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default ProductImageCarousel;
