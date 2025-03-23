import connectDb from "@/db/connect";
export async function GET(req){
    connectDb(); 
}