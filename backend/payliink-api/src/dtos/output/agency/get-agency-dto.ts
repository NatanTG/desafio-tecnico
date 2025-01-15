import { AgencyStatus } from "@prisma/client";

export type GetAgencyDTO = {
  agency: {
    id: string;
    name: string;
    status: AgencyStatus;
    cnpj: string;
    stateRegistration: string;
    founded: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
