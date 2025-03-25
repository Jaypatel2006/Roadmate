import { NextResponse } from "next/server";
import { User } from "@/db/models/usermodel.js";
import connectDb  from "@/db/connect.js";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/jwt.js";

export async function POST(request) {
  await connectDb();
  const { email, password } = await request.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = generateToken(user._id);

  const response = NextResponse.json({ message: "Logged in successfully" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24*60*60*365*50,
    path: "/",
  });

  return response;
}
