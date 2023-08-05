"use client";
import Footer from "@/components/Footer";
import SearchAppBar from "@/components/Navbar";
import NavbarCategories from "@/components/Navbar/NavbarCategories";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchAppBar />
      <NavbarCategories />
      <div style={{ minHeight: "100vh" }}>{children}</div>
      <Footer />
    </>
  );
};

export default HomeLayout;
