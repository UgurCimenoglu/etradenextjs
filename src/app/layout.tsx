"use client";
import "./globals.css";
import React from "react";
import MyThemeProvider from "@/components/ThemeProvider";
import SearchAppBar from "@/components/Navbar";
import Container from "@mui/material/Container";
import NavbarCategories from "@/components/Navbar/NavbarCategories";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MyThemeProvider>
          <SearchAppBar />
          <NavbarCategories />
          {children}
          <Footer />
        </MyThemeProvider>
      </body>
    </html>
  );
}
