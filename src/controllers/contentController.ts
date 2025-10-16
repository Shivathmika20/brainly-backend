import {Content,Tags,ContentType, User} from "../db";
import {Request,Response} from "express";
import { z } from "zod";
import { Types } from "mongoose";
import {ensureTagsExist} from "../services/tags-services";

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
    userId?: Types.ObjectId;
}

const contentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    link: z.string().min(1, "Link is required"),
    type: z.enum(Object.values(ContentType) as [string, ...string[]]),
    tags: z.array(z.string()).optional(),
});

export const createContent = async (req: AuthenticatedRequest, res: Response) => {
    const result = contentSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.message });
    }
    
    try {
        const { title, link, type,tags} = result.data;
        const userId = req.userId;
        
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const tagIds=await ensureTagsExist(tags || []);
        console.log(tagIds);//contains array of objectIds
        const newContent=await Content.create({
            title,
            link,
            type,
            tagofContent:tagIds,
            userId:userId, 
        });
        
        return res.status(201).json({ message: "Content created successfully" ,content:newContent});
    } catch (error) {
        console.error("Content creation error:", error);
        return res.status(500).json({ error: "Failed to create content" });
    }
}
export const getContent=async (req:AuthenticatedRequest,res:Response)=>{
    const userId=req.userId;
    try{
        const contents=await Content.find({userId:userId});
        return res.status(200).json({contents});
    } catch (error) {
        console.error("Content fetching error:", error);
        return res.status(500).json({ error: "Failed to fetch content" });
    }
}

export const deleteContent=async(req:AuthenticatedRequest,res:Response)=>{
    const {id}=req.params;
    try{
        await Content.findByIdAndDelete(id);
        return res.status(200).json({message:"Content deleted successfully"});
    } catch (error) {
        console.error("Content deletion error:", error);
        return res.status(500).json({ error: "Failed to delete content" });
    }

}