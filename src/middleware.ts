import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_PAGE = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  // const token = await getToken({ req: request });
  // console.log("JSON Web Token", JSON.stringify(token, null, 2));
  
  return NextResponse.next();
}

export const config = { matcher: ["/products", "/"] };

// const requestForNextAuth = {
//   headers: {
//     cookie: request.headers.get("cookie") ?? undefined,
//   },
// };
