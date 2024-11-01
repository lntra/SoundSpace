import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { verifyToken } from "./app/utils/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  const publicPaths = ["/", "/pages/login", "/pages/register"];

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const authTokenCookie = cookies.find((c) => c.startsWith("auth_token="));

  if (authTokenCookie) {
    const token = authTokenCookie.split("=")[1];

    if (token) {
      try {
        const result = verifyToken(token);

        if (await result) {
          return NextResponse.next();
        }
      } catch (error: any) {
        if (
          error instanceof jwt.TokenExpiredError ||
          error.name === "TokenExpiredError"
        ) {
          console.error("Token expired:", error.message);
        } else {
          console.error("Invalid token:", error);
        }
      }
    }
  }

  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login|home).*)", // Exclude specific paths like API routes, static files, homepage, etc.
};
