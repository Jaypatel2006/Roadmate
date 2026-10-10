import mongoose from "mongoose";
const mechanicschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Mechanic = mongoose.models.Mechanic || mongoose.model("Mechanic", mechanicschema);