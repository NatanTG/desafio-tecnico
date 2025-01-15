import { TokenProvider } from "../../../config/utils/auth/token-provider";
import { UserRepository } from "../../../repositories/user/user-repositorie";
import { AuthService } from "../auth-service";


export class AuthServiceImplementation implements AuthService {
  constructor(private readonly repository: UserRepository, private readonly tokenProvider: TokenProvider) {}

  public static build(repository: UserRepository, tokenProvider: TokenProvider): AuthService {
    return new AuthServiceImplementation(repository, tokenProvider);
  }

  public async login(email: string, password: string): Promise<string | null> {
    try {
      const token = await this.repository.authenticateUser(email, password, this.tokenProvider);

      return token ? token : null;
    } catch (error) {
      console.error("Error during login:", error);

      throw new Error(error instanceof Error ? `Login failed: ${error.message}` : 'An unknown error occurred during the login process.');
    }
  }
}
