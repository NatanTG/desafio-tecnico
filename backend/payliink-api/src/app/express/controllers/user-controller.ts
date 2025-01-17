import { NextFunction, Request, Response } from "express";
import { UserService } from "../../../services/user/user-service";

export class UserController {
  constructor(private userService: UserService) {}

  public static build(userService: UserService): UserController {
    return new UserController(userService);
  }

  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      console.error("Error registering user:", error);
      next(error); 
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      
      !token
        ? res.status(401).json({ error: "Invalid credentials" })
        : res.json({ token });
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ error: error.message || "Nao foi possivel logar o usuario" });
    }
  }

};
