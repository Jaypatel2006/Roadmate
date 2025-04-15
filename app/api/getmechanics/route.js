import connectDb from '@/db/connect.js';
import {Mechanic} from '@/db/models/mechanicmodel.js';
import { NextResponse } from 'next/server';

export async function GET(request){
    try {
        await connectDb();
        const mechanics = await Mechanic.find({});
        return NextResponse.json({mechanics});
    } catch (error) {
        console.error("Error fetching mechanics:", error);
        return NextResponse.json({error: "Failed to fetch mechanics"}, {status: 500});
    }
}