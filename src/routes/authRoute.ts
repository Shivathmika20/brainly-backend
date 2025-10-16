import { Router } from "express";
const authRouter = Router();
import { signup,signin } from "../controllers/authController.js";

authRouter.post("/signup",signup);

authRouter.post("/signin",signin);

export default authRouter;