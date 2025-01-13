import { IsString, IsEmail, MinLength } from "class-validator";

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, {
    message: "Password is too short. It should be at least 6 characters.",
  })
  password: string;
}