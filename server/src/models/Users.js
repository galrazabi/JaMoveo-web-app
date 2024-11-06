import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    instrument: {type:String, required:true },
    isAdmin:{type:Boolean, required: true}
})

export const UsersModel = mongoose.model("jamoveo-users", UsersSchema)