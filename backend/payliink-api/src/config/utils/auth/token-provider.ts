export interface TokenProvider {
    generateToken(userId: string): string;
    validateToken(token: string): Promise<string | null> 
}
