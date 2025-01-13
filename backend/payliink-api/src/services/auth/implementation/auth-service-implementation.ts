import { UserRepository } from "../../../repositories/user/user-repositorie";
import { AuthService } from "../auth-service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthServiceImplementation implements AuthService {
  constructor(private repository: UserRepository) {}

  public async login(email: string, password: string): Promise<string | null> {
    try {
      const userDTO = await this.repository.getUserByEmail(email);

      return !userDTO || userDTO.user.length === 0
        ? null
        : await bcrypt.compare(password, userDTO.user[0].password)
          ? this.generateToken(userDTO.user[0].id)
          : null;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }

  public async validateToken(token: string): Promise<string | null> {
    try {
      const secretKey = process.env.JWT_SECRET || "VLFs5cFKepvUA8uwIZ51Z3P2B1QNYGEv8YoYAXd9TUY=";
      const payload = jwt.verify(token, secretKey) as { userId: string };
      return payload.userId;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  public generateToken(userId: string): string {
    const secretKey = process.env.JWT_SECRET || "VLFs5cFKepvUA8uwIZ51Z3P2B1QNYGEv8YoYAXd9TUY=";
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  }
}
