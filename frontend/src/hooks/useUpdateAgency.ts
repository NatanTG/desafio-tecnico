import { AgencyService } from '@/data/services/agency/agencyService';
import { Agency } from '@/domain/interfaces/angecyInterface';
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export function useUpdateAgency(agencyService: AgencyService) {
  const mutation: UseMutationResult<void, Error, Agency> = useMutation({
    mutationFn: async (updatedAgency: Agency) => {
      const agencyWithUpdatedDate = {
        ...updatedAgency,
        founded: new Date(updatedAgency.founded).toISOString(),
      };

      await agencyService.update(updatedAgency.id, agencyWithUpdatedDate); 
    },
    onError: (error: Error) => {
      console.error("Erro ao atualizar agência:", error);
    },
    onSuccess: (agency) => {
      console.log("Agência atualizada com sucesso:", agency);
    },
  });

  return mutation;
}
