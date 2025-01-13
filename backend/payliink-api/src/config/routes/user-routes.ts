import { Router } from "express";
import { UserController } from "../../app/express/controllers/user-controller";
import { userService } from "../dependencies/dependencies";

const userController = new UserController(userService);
const userRouter = Router();

userRouter.post("/register", (req, res) => userController.register(req, res)); 
userRouter.post("/login", (req, res) => userController.login(req, res)); 
export default userRouter ;