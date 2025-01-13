import { CreateUserDTO } from "../../dtos/input/user/create-user-dto";
import { UpdateUserDTO } from "../../dtos/input/user/update-user-dto";
import { GetUserByIdDTO } from "../../dtos/output/user/get-user-by-id-dto";
import { GetUserDTO } from "../../dtos/output/user/get-user-dto";

export interface UserService {
  createUser(userData: CreateUserDTO): Promise<GetUserByIdDTO>;
  login(name: string, password: string): Promise<string | null>; 
}