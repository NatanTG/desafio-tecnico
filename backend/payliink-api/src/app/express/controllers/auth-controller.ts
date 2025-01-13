import { Request, Response } from "express";
import { AuthService } from "../../../services/auth/auth-service";

export class AuthController {
  constructor(private authService: AuthService) {}

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);
    
    if (!token) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    
    res.json({ token });
  }
}