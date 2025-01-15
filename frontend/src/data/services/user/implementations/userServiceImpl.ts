
import { removeToken } from "@/config/utils/auth/storage";
import { api } from "../../api/api";
import { UserService } from "../userService";


export class UserServiceImpl implements UserService {
  async login(email: string, password: string): Promise<string> {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const token = response.data.token;

      return token;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Falha ao fazer login");
    }
  }

  logout(): void {
    removeToken(); 
  }


  async registerUser(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    role: string
  ): Promise<void> {
    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem!");
    }

    try {
      await api.post('/register', {
        email,
        password,
        name,
        role,
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      throw new Error("Falha ao registrar usuário");
    }
  }
}
