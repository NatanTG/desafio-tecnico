import { UserRepository } from "../../../repositories/user/user-repositorie";
import { AuthService } from "../auth-service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthServiceImplementation implements AuthService {
  constructor(private repository: UserRepository) {}

  public async login(email: string, password: string): Promise<string | null> {
    const userDTO = await this.repository.getUserByEmail(email);

    if (!userDTO || userDTO.user.length === 0) {
      return null; 
    }

    const user = userDTO.user[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return this.generateToken(user.id);
  }

  public async validateToken(token: string): Promise<string | null> {
    try {
      const secretKey = process.env.JWT_SECRET || "VLFs5cFKepvUA8uwIZ51Z3P2B1QNYGEv8YoYAXd9TUY=";
      const payload = jwt.verify(token, secretKey) as { userId: string };
      return payload.userId;
    } catch (error) {
      return null;
    }
  }

  public generateToken(userId: string): string {
    const secretKey = process.env.JWT_SECRET || "VLFs5cFKepvUA8uwIZ51Z3P2B1QNYGEv8YoYAXd9TUY=";
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  }
}