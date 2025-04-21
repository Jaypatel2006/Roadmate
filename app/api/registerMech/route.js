import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Mechanic } from "@/db/models/mechanicmodel.js";
import connectDb from "@/db/connect.js"; // Ensure MongoDB connection

export async function POST(req) {
    await connectDb()
  try {
    const bodyText = await req.text(); // Read request body as text for debugging
    console.log("Received Raw Body:", bodyText);

    if (!bodyText) {
      return NextResponse.json({ message: "Empty request body" }, { status: 400 });
    }

    const { name, email, password, latitude, longitude } = JSON.parse(bodyText);

    // Validate input
    if (!name || !email || !password || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    // Check if email already exists
    const existingMechanic = await Mechanic.findOne({ email });
    if (existingMechanic) {
      return NextResponse.json({ message: "Email already registered!" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to MongoDB
    const newMechanic = new Mechanic({ name, email, password: hashedPassword, latitude, longitude });
    await newMechanic.save();

    return NextResponse.json({ message: "Mechanic registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ message: "Server error occurred!" }, { status: 500 });
  }
}
