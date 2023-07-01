import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";
import styles from "./page.module.css";
export default function CampaignProductCards() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className={styles.mySwiper}
        onClick={() => console.log("ürüne git işlemi yapılacak")}
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
        <SwiperSlide className={styles.mySwiperSlide}>Slide 4</SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>Slide 5</SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>Slide 6</SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>Slide 7</SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>Slide 8</SwiperSlide>
        <SwiperSlide className={styles.mySwiperSlide}>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function ImgMediaCard() {
  return (
    <Card sx={{ width: "100%", height: "100%" }}>
      <CardMedia
        component="img"
        alt="photo"
        image="https://www.gaming.gen.tr/wp-content/uploads/2023/05/asus-tuf-gaming-gt301-gaminggentr-edition-rgb-temperli-cam-usb-3-2-mid-tower-kasa-600x600.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
