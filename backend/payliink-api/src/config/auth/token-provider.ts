export interface TokenProvider {
    generateToken(payload: object, expiresIn: string): string;
    verifyToken(token: string): object | null;
}
