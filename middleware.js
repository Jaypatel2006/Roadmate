
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";


export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const user = await verifyToken(token);

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main"],
};
