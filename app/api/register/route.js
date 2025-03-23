import connectDb from "@/db/connect";
import { NextResponse } from "next/server";
import {User} from "@/db/models/usermodel.js"

export async function POST(req){
    await connectDb(); 

    const body = await req.json(); // Parse the request body
    const { name, email, password } = body;

    if(!name || !email || !password){
        return NextResponse.json({message:"Please provide all credentials"},{status:400})
    }
    const user = await User.create({
        name,
        email,
        password
    })

    return NextResponse.json({user},{status:200})
}