"use client";
import "./globals.css";
import React from "react";
import MyThemeProvider from "@/components/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProgressProvider from "@/components/ProgressProvider";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomQueryClient from "@/components/QueryClient";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    console.warn = () => {};
    console.error = () => {};
    console.log = () => {};
  }

  return (
    <SessionProvider>
      <CustomQueryClient>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT as string}
        >
          <MyThemeProvider>
            <html lang="en">
              <body>
                <ProgressProvider>
                  <ToastContainer />
                  {children}
                </ProgressProvider>
              </body>
            </html>
          </MyThemeProvider>
        </GoogleOAuthProvider>
      </CustomQueryClient>
    </SessionProvider>
  );
}
