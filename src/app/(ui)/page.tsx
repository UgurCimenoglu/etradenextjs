"use client";
import CampaignProducts from "@/components/CampaignProducts";
import HomeCarousel from "@/components/HomeCarousel";
import MostPreferredProducts from "@/components/MostPreferredProducts";
import { GetProducts } from "@/services/Products";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const { mutate, data, isLoading } = useMutation(GetProducts, {
    onError: () => {
      toast.error("Ürünler Listelendirken Hata Meydana Geldi");
    },
    onSuccess: (data) => {
      console.log("Ürünler Listelendi.");
    },
  });

  useEffect(() => {
    mutate({ page: 0, size: 12 });
  }, []);

  return (
    <>
      <HomeCarousel />
      <CampaignProducts products={data?.products} />
      <MostPreferredProducts products={data?.products} />
    </>
  );
};

export default Home;
