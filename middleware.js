import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect("/login");

  const user = verifyToken(token);
  if (!user) return NextResponse.redirect("/login");

  req.user = user;
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/protected/:path*"],
};

