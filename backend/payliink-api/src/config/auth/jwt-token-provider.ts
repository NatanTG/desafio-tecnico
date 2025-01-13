import jwt from "jsonwebtoken";
import { TokenProvider } from "./token-provider";

export class JwtTokenProvider implements TokenProvider {
    private constructor(private readonly secretKey: string) {}

    public static build(secretKey: string): JwtTokenProvider {
        return new JwtTokenProvider(secretKey);
    }

    public generateToken(payload: object, expiresIn: string): string {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    public verifyToken(token: string): object | null {
        try {
            return jwt.verify(token, this.secretKey) as object;
        } catch {
            return null;
        }
    }
}
