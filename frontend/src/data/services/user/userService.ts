export interface UserService {
    login(email: string, password: string): Promise<string>; 
    logout(): void; 
    registerUser(email: string, password: string, confirmPassword: string, name: string, role: string): Promise<void>;
  }
  