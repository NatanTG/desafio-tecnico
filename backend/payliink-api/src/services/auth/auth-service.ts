export interface AuthService { 
  login(email: string, password: string): Promise<string | null>;
  validateToken(token: string): Promise<string | null>;
  generateToken(userId: string): string;
}
  