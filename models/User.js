import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    //create a schema for the user with email, name, username, profile, cover, createdtime, updatedtime
    email: {type: String,required: true},
    name: {type: String,},
    username: {type: String,required: true},
    profilepic: {type: String,},
    coverpic: {type: String,},
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    createdtime: {type: Date,default: Date.now},
    updatedtime: {type: Date,default: Date.now},
});

export default mongoose.models.User || model("User", UserSchema);;