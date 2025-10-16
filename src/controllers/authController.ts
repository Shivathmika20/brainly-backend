import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config";


const signupSchema=z.object({
   userName:z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be at most 20 characters"),
   password:z.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters")
      .refine((val) => /[a-z]/.test(val), {
         message: "Password must contain at least one lowercase letter"
      })
      .refine((val) => /[A-Z]/.test(val), {
         message: "Password must contain at least one uppercase letter"
      })
      .refine((val) => /\d/.test(val), {
         message: "Password must contain at least one number"
      })
      .refine((val) => /[@$!%*?&]/.test(val), {
         message: "Password must contain at least one special character (@$!%*?&)"
      })
      .refine((val) => /^[A-Za-z\d@$!%*?&]+$/.test(val), {
         message: "Password can only contain letters, numbers, and special characters (@$!%*?&)"
      }),
})

type userInput=z.infer<typeof signupSchema>;


export const signup = async (req:Request,res:Response) => {
   const result = signupSchema.safeParse(req.body);
   if (!result.success) {
      const errorMessages = result.error.issues.map((err) => err.message);
      return res.status(400).json({
         error: "Validation failed",
         details: errorMessages
      });
   }
   
   try{
      const {userName,password}=result.data as userInput;
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


export const signin = async(req:Request,res:Response) => {
  
   try{
      const {userName,password}=req.body as userInput;
      const user=await User.findOne({userName});
      if(user)
      {
         const isPasswordValid=await bcrypt.compare(password,user.password);
         if(isPasswordValid) {
            if (!JWT_SECRET) {
               throw new Error('JWT_SECRET is not defined in config');
            }
            const token = jwt.sign(
               { id: user._id, username: user.userName },
               JWT_SECRET,
               { expiresIn: "1h" }
            );
            return res.status(200).json({ token });
         } else {
            return res.status(401).json({ error: "Invalid password" });
         }
      }
   }
   catch(error){
      res.status(500).json({error:"Failed to sign in try again later"});
   }
}