import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config";
import {  Response, NextFunction, Request } from "express";



const authMiddleware = (req:Request,res:Response,next:NextFunction) => {
   const token= req.headers.authorization; //token can be string or undefined we jst need string  so we use as string same goes for JWT_SECRET
   try {
      
      const decoded = jwt.verify(token as string, JWT_SECRET as string);
      // @ts-ignore
      req.user = decoded;
      next();
   } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
   }
}

export default authMiddleware;
      
 

