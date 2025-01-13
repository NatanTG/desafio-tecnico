import { UserService } from "../user-service";
import { CreateUserDTO } from "../../../dtos/input/user/create-user-dto";
import { UpdateUserDTO } from "../../../dtos/input/user/update-user-dto";
import { GetUserDTO } from "../../../dtos/output/user/get-user-dto";
import { GetUserByIdDTO } from "../../../dtos/output/user/get-user-by-id-dto";
import { User } from "@prisma/client"; 
import { UserRepository } from "../../../repositories/user/user-repositorie";
import { AuthService } from "../../auth/auth-service";

export class UserServiceImplementation implements UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly authService: AuthService
  ) {}

  static build(repository: UserRepository, authService: AuthService): UserService {
    return new UserServiceImplementation(repository, authService);
  }

  public async login(email: string, password: string): Promise<string | null> {
    return this.authService.login(email, password);
  }

  

  
  public async createUser(userData: CreateUserDTO): Promise<GetUserByIdDTO> {
    const createdUser = await this.repository.createUser(userData);
    return {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          createdAt: createdUser.createdAt.toString(),
          updatedAt: createdUser.updatedAt.toString(),
    };

    
  }






}
