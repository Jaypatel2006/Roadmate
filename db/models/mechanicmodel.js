import mongoose from "mongoose";
const mechanicschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String,
    },
    latitude:{
        type:Number
    },
    longitude:{
        type:Number
    }
},{timestamps:true})

export const Mechanic = mongoose.models.Mechanic || mongoose.model("Mechanic", mechanicschema);