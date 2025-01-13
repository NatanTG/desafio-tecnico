import { Router } from "express";
import { AuthController } from "../../app/express/controllers/auth-controller";
import { authService } from "../dependencies/dependencies";

const authController = new AuthController(authService);
const authRouter = Router();

authRouter.post("/login", (req, res) => authController.login(req, res));

export { authRouter };