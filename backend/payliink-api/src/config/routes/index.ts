import { Router } from "express";
import agencyRouter from "./agency-routes";
import userRouter from "./user-routes";

const router = Router();

router.use("/agency",agencyRouter);
router.use(userRouter);

export default router ;