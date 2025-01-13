import { IsString, IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "@prisma/client"; 

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
  
  
}
