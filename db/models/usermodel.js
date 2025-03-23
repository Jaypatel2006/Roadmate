import mongoose from "mongoose"
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.models.User || mongoose.model('User', userschema);
