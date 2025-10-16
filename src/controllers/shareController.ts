import { Request, Response } from "express";
import { Types } from "mongoose";
import { Link ,Content} from "../db";
import crypto from "crypto";

export const shareContent=async(req:Request,res:Response)=>{
    const {share}=req.body;
    const userId=req.userId
    if(share){
        const existingLink=await Link.findOne({userid:userId});
        if(existingLink){
            res.json({hash:existingLink.hash})
            return;
        }
    const hash=crypto.randomBytes(8).toString("hex");
    await Link.create({hash:hash,userId:userId});
    const shareUrl = `${req.protocol}://${req.get("host")}/share/${hash}`;
    res.status(200).json({
        message:"Link created successfully",
        hash:hash,
        shareUrl:shareUrl
    })
    
    }
        else{
            await Link.deleteOne({userId:userId});
            res.json({message:"Link deleted successfully"})
        }
}

export const getSharedContent=async(req:Request,res:Response)=>{
    const {sharedLink}=req.params;
    const link=await Link.findOne({hash:sharedLink});
    if(!link){
        res.status(404).json({error:"Link not found"})
        return;
    }
    const content=await Content.find({userId:link.userId});
    res.json({
        message:"Content retrieved successfully",
        content:content,
        
    })
}