import { Router } from "express";
const shareRouter = Router();
import authMiddleware from "../middleware/auth";
import { shareContent, getSharedContent } from "../controllers/shareController";

shareRouter.post("/share",authMiddleware,shareContent);


shareRouter.get("/share/:sharedLink", getSharedContent); // No auth required for viewing shared content


export default shareRouter;