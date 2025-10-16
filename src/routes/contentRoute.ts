import { Router } from "express";
import authMiddleware from "../middleware/auth";
const contentRouter = Router();
import { createContent,getContent,deleteContent } from "../controllers/contentController";

contentRouter.post("/content",authMiddleware,createContent);

contentRouter.get("/content",authMiddleware,getContent);

contentRouter.delete("/content/:id",authMiddleware,deleteContent);

export default contentRouter;