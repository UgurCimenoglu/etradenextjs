"use client";
import CampaignProducts from "@/components/CampaignProducts";
import HomeCarousel from "@/components/HomeCarousel";
import MostPreferredProducts from "@/components/MostPreferredProducts";
import React from "react";

const Home = () => {
  return (
    <>
      <HomeCarousel />
      <CampaignProducts />
      <MostPreferredProducts />
    </>
  );
};

export default Home;
