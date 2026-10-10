import { NextResponse } from "next/server";
import connectDB from "@/db/connect.js";
import { Mechanic } from "@/db/models/mechanicmodel.js";

export async function GET() {
    try {
        await connectDB();
        const mechanics = await Mechanic.find({}, "name latitude longitude");
        return NextResponse.json(mechanics);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch mechanics" },
            { status: 500 }
        );
    }
}
