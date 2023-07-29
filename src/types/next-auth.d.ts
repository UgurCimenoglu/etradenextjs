import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      expration: Date;
      refreshToken: string;
    };
  }
}
