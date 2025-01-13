import { CreateUserDTO } from "../../dtos/input/user/create-user-dto";
import { UpdateUserDTO } from "../../dtos/input/user/update-user-dto";
import { GetUserByIdDTO } from "../../dtos/output/user/get-user-by-id-dto";
import { GetUserDTO } from "../../dtos/output/user/get-user-dto";

export interface UserRepository {
    createUser(createUserDTO: CreateUserDTO): Promise<GetUserByIdDTO | null>;  
    getUserByEmail(email: string): Promise<GetUserDTO | null>;
}