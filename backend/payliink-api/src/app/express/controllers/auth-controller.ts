import { Request, Response } from "express";
import { AuthService } from "../../../services/auth/auth-service";

export class AuthController {
  constructor(private authService: AuthService) {}

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      
      !token
        ? res.status(401).json({ error: "Invalid credentials" })
        : res.json({ token });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "500 Internal Error" });
    }
  }
}