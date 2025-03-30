import { NextResponse } from "next/server";
import { User } from "@/db/models/usermodel.js";
import connectDb from "@/db/connect.js";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/jwt.js";

export async function POST(request) {
  await connectDb();
  const { email, password } = await request.json();

  console.log("Login attempt for:", email); // Debugging

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found.");
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Password mismatch.");
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken(user._id);

  console.log("Generated token:", token); // Debugging

  const response = NextResponse.json({ message: "Logged in successfully" });

  response.cookies.set("token", token, {
    httpOnly: true, // Secure from client-side scripts
    secure: process.env.NODE_ENV === "production", // Secure in production
    sameSite: "strict",
    maxAge: 24 * 60 * 60, // 1 day
    path: "/",
  });

  console.log("Token set in cookies."); // Debugging

  return response;
}
