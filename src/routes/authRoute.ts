import { Router } from "express";
const authRouter = Router();
import { signup } from "../controllers/authController.js";

authRouter.post("/signup",signup);

authRouter.post("/signin", (req, res) => {});

export default authRouter;