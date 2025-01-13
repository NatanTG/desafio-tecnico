import { AgencyStatus } from "@prisma/client";

export type GetAgencyByIdDTO = {
  agency: {
    id: string;
    name: string;
    status: AgencyStatus;
    cnpj: string;
    stateRegistration: string;
    createdAt: string;
    updatedAt: string;
  };
};
