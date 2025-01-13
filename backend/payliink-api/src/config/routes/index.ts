import { Router } from "express";
import agencyRouter from "./agency-routes";
import  authRouter  from "./auth-router";
import userRouter from "./user-routes";

const router = Router();

// Registrar rotas
router.use("/agency", agencyRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router ;