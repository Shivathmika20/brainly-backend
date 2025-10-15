import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../db";
import bcrypt from "bcrypt";

const signupSchema=z.object({
   userName:z.string().min(3).max(20),
   password:z.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
})

export const signup = async (req:Request,res:Response) => {
   const result=signupSchema.safeParse(req.body);
   if(!result.success){
      
      return res.status(400).json({error:result.error.message});
   }
   
   try{
      const {userName,password}=result.data;
      const existingUser=await User.findOne({userName});
      if(existingUser){
         return res.status(403).json({error:"Username already exists"});
      }
      
      const hashedPassword=await bcrypt.hash(password,10);
      await User.create({
         userName:userName,
         password:hashedPassword,
      })
      return res.status(200).json({message:"User signed up successfully"});
      
   } catch(error){
      console.error("Signup Error:", {
         timestamp: new Date().toISOString(),
         endpoint: "/auth/signup",
         error: error instanceof Error ? error.message : "Unknown error",
         stack: error instanceof Error ? error.stack : undefined,
         body: req.body,
       
      });

      return res.status(500).json({error:"Failed to create user"});
   }
};