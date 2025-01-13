import { Router } from "express";
import { UserController } from "../../app/express/controllers/user-controller";
import { userService } from "../dependencies/dependencies";

const userController = new UserController(userService);
const userRouter = Router();

userRouter.post("/register", (req, res) => userController.register(req, res)); // Cria um novo analista ou administrador
userRouter.post("/login", (req, res) => userController.login(req, res)); // Faz o login de um analista ou administrador

export default userRouter ;