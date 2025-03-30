export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt"; // Ensure the path is correct

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  console.log("Token from cookies:", token); // Debugging

  if (!token) {
    console.log("No token found. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const user = verifyToken(token);

  console.log("User after verification:", user); // Debugging

  if (!user) {
    console.log("Invalid token. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/aboutus/:path*"], 
};
