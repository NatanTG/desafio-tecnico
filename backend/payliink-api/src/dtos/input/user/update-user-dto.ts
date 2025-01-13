import { UserRole } from "@prisma/client";

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole; 
  }