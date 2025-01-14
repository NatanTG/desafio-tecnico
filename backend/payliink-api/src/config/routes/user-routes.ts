import { Router } from "express";
import { UserController } from "../../app/express/controllers/user-controller";
import { userService } from "../dependencies/dependencies";

const userController = UserController.build(userService);
const userRouter = Router();

userRouter.post("/register", (req, res, next) => userController.register(req, res, next)); 
userRouter.post("/login", (req, res) => userController.login(req, res)); 
export default userRouter ;