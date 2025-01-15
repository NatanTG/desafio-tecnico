import jwt from "jsonwebtoken";
import { TokenProvider } from "./token-provider";

export class JwtTokenProvider implements TokenProvider {
    private constructor() {}
    public static build(): JwtTokenProvider {
        return new JwtTokenProvider();
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
