import { AgencyStatus } from "@prisma/client";
import { IsNotEmpty, IsString, IsEnum } from "class-validator";


export class CreateAgencyDTO {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsEnum(AgencyStatus, { message: "Status must be one of: active, inactive, pending" })
  public readonly status: AgencyStatus;

  @IsNotEmpty()
  @IsString()
  public readonly cnpj: string;

  @IsNotEmpty()
  @IsString()
  public readonly stateRegistration: string;

}
  
