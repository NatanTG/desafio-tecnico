import { Request, Response } from "express";
import { UserService } from "../../../services/user/user-service";


export class UserController {
  constructor(private userService: UserService) {}

  public static build(userService: UserService): UserController {
    return new UserController(userService);
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Nao foi possivel registrar o usuario" });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      if (!token) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Nao foi possivel registrar o usuario" });
    }
  }
}