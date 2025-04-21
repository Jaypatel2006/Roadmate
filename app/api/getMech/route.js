import  connectDB  from "@/db/connect.js"; // Ensure you have a MongoDB connection file
import { Mechanic } from "@/db/models/mechanicmodel.js";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        await connectDB();
        const mechanics = await Mechanic.find({}, "name latitude longitude"); // Fetch only required fields
        res.status(200).json(mechanics);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch mechanics" });
    }
}
