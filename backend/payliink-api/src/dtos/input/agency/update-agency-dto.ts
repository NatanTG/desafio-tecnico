import { AgencyStatus } from "@prisma/client";
import {IsString, IsEnum, IsOptional } from "class-validator";

export class UpdateAgencyDTO {
  @IsOptional()
  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsEnum(AgencyStatus, { message: "Status must be one of: active, inactive, pending" })
  public readonly status: AgencyStatus;

  @IsOptional()
  @IsString()
  public readonly cnpj: string;

  @IsOptional()
  @IsString()
  public readonly stateRegistration: string;

  @IsOptional()
  @IsString()
  public readonly founded: string;

}


