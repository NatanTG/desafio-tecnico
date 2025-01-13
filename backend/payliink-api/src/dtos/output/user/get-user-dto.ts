import { UserRole } from "@prisma/client";

export type GetUserDTO = {
    user : {
      id: string;
      name: string;
      password: string;
      email: string;
      role: UserRole;
      createdAt: string;
      updatedAt: string;
    }[];
  };