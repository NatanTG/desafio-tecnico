import { UserRole } from "@prisma/client";

export type GetUserByIdDTO = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
  }
  