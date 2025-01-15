import { useState } from "react";
import { Agency } from "@/domain/interfaces/angecyInterface";
import { AgencyService } from "@/data/services/agency/agencyService";

export const useCreateAgency = (agencyService: AgencyService) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createAgency = async (agency: Agency) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const updatedAgency = {
        ...agency,
        founded: new Date(agency.founded).toISOString(),
      };
      await agencyService.create(updatedAgency);
      setIsSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Erro desconhecido"));
    } finally {
      setIsLoading(false);
    }
  };

  return { createAgency, isLoading, error, isSuccess };
};
