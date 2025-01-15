import { Router } from "express";
import { UserController } from "../../app/express/controllers/user-controller";
import { userService } from "../dependencies/dependencies";

const userController = UserController.build(userService);
const userRouter = Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    await userController.register(req, res, next);
    } catch (error) {  
    next(error);  
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    await userController.login(req, res);  
  } catch (error) {
    next(error);
  }
});

export default userRouter;
