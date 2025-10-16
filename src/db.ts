import mongoose, { Schema, Types } from "mongoose";


export enum ContentType{
    DOCUMENT = "pdf",
    TWITTER="twitter",
    YOUTUBE="youtube",
    
}


const userSchema= new Schema({
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true},
},{timestamps:true}
)

export const User = mongoose.model("users", userSchema);

const ContentSchema= new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: Object.values(ContentType), required: true },
    tagofContent: [{ type: Types.ObjectId, ref: "tags" }],
    userId: { type: Types.ObjectId, ref: "users"},
    createdAt: { type: Date, default: Date.now },
    
})

export const Content = mongoose.model("contents", ContentSchema);

const tagsSchema= new Schema({
    title:{type:String,required:true,unique:true},
},{timestamps:true})

export const Tags = mongoose.model("tags", tagsSchema);

const linkSchema= new Schema({
    hash:{type:String, unique:true},
    userId: { type: Types.ObjectId, ref: "users" },
    
    
})

export const Link = mongoose.model("links", linkSchema);
