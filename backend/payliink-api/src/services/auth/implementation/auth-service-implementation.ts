import { TokenProvider } from "../../../config/utils/auth/token-provider";
import { UserRepository } from "../../../repositories/user/user-repositorie";
import { AuthService } from "../auth-service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthServiceImplementation implements AuthService {
  constructor(private readonly repository: UserRepository, private readonly tokenProvider: TokenProvider ) {}

  public static build(repository: UserRepository, tokenProvider: TokenProvider): AuthService {
    return new AuthServiceImplementation(repository, tokenProvider);
  }

  public async login(email: string, password: string): Promise<string | null> {
    try {
      const userDTO = await this.repository.getUserByEmail(email);

      return !userDTO || userDTO.user.length === 0
        ? null
        : await bcrypt.compare(password, userDTO.user[0].password)
          ? this.tokenProvider.generateToken(userDTO.user[0].id)
          : null;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }

}
