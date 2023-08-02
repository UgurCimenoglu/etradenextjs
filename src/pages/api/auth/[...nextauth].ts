import {
  FacebookLoginRequest,
  GoogleLoginRequest,
  LoginRequest,
  RefreshTokenLogin,
} from "@/services/Auth/login";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    //burada custom bir login sistemi kodladım. Giriş yaparken email ve şifre alıp backende istek atıp eğer giriş başarılı ise jwt ve refresh token dönüyor ve
    //biz de bu değerleri nextauth paketini kendimize göre configure edip sessionun içine bu değerleri verdik.
    CredentialsProvider({
      name: "BackendLogin",
      id: "backend-login",
      type: "credentials",
      credentials: {
        usernameOrEmail: {},
        password: {},
      },
      async authorize(credentials, req) {
        var result = await LoginRequest({
          usernameOrEmail: credentials?.usernameOrEmail,
          password: credentials?.password,
        });
        if (result) return result as any;
        return null;
      },
    }),
    CredentialsProvider({
      name: "CustomGoogleLogin",
      id: "custom-google-login",
      credentials: {
        code: {},
      },
      async authorize(credentials, req) {
        var result = await GoogleLoginRequest({
          code: credentials?.code,
        });
        if (result) return result as any;
        return null;
      },
    }),
    CredentialsProvider({
      name: "CustomFacebookLogin",
      id: "custom-facebook-login",
      credentials: {
        authToken: {},
      },
      async authorize(credentials, req) {
        var result = await FacebookLoginRequest({
          authToken: credentials?.authToken,
        });
        if (result) return result as any;
        return null;
      },
    }),
    CredentialsProvider({
      name: "Refresh-TokenLogin",
      id: "refresh-token",
      credentials: {
        refreshToken: {},
      },
      async authorize(credentials, req) {
        console.log("cewss", credentials?.refreshToken);
        var result = await RefreshTokenLogin({
          refreshToken: credentials?.refreshToken,
        });
        if (result) return result as any;
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },
    async session({ session, token }) {
      session.user = token.token as any;
      session.expires = "";
      return session;
    },
  },
  pages: {
    error: "/login",
  },
});
