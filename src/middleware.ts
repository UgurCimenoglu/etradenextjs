import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGE = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;

  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie") ?? undefined,
    },
  };

  return NextResponse.next();
}

export const config = { matcher: ["/products", "/"] };
