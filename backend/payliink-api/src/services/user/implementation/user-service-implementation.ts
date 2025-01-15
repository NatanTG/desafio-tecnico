import { AppError } from "../../../config/utils/app-error";
import { CreateUserDTO } from "../../../dtos/input/user/create-user-dto";
import { GetUserByIdDTO } from "../../../dtos/output/user/get-user-by-id-dto";
import { GetUserDTO } from "../../../dtos/output/user/get-user-dto";
import { UserRepository } from "../../../repositories/user/user-repositorie";
import { AuthService } from "../../auth/auth-service";
import { UserService } from "../user-service";

export class UserServiceImplementation implements UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly authService: AuthService
  ) {}

  static build(repository: UserRepository, authService: AuthService): UserService {
    return new UserServiceImplementation(repository, authService);
  }

  public async login(email: string, password: string): Promise<string | null> {
    try {
      const token = await this.authService.login(email, password);
      return token ? token : (() => { throw new AppError("Invalid credentials", 401); })(); 
    } catch (error: any) {
      console.error("Error during login:", error);
      throw error instanceof AppError ? error : new AppError("Failed to log in", 500); 
    }
  }

  public async createUser(userData: CreateUserDTO): Promise<GetUserByIdDTO | null> {
    try {
      const createdUser = await this.repository.createUser(userData);
      return createdUser
        ? {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
            createdAt: createdUser.createdAt.toString(),
            updatedAt: createdUser.updatedAt.toString(),
          }
        : (() => { throw new AppError("User creation failed", 400); })(); 
    } catch (error: any) {
      console.error("Error creating user:", error);
      throw error instanceof AppError ? error : new AppError("Failed to create user", 500);
    }
  }
}
