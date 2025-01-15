import { JwtTokenProvider } from "../../config/utils/auth/jwt-token-provider";
import { CreateUserDTO } from "../../dtos/input/user/create-user-dto";
import { GetUserByIdDTO } from "../../dtos/output/user/get-user-by-id-dto";

export interface UserRepository {
  createUser(createUserDTO: CreateUserDTO): Promise<GetUserByIdDTO | null>;
  authenticateUser(email: string, password: string, tokenProvider: JwtTokenProvider): Promise<string | null>;  
}
