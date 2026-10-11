import connectDb from "@/db/connect";
import { NextResponse } from "next/server";
import {User} from "@/db/models/usermodel.js"

export async function POST(req){
    await connectDb(); 

    try {
        const body = await req.json();
        const { name, email, password } = body;

        if(!name || !email || !password){
            return NextResponse.json({message:"Please provide all credentials"},{status:400})
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({message:"Email already registered"},{status:400})
        }

        const user = await User.create({
            name,
            email,
            password
        })

        return NextResponse.json({user},{status:201})
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({message:"Server error occurred"},{status:500})
    }
}
