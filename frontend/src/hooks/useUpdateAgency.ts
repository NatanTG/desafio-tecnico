import { AgencyService } from '@/data/services/agency/agencyService';
import { Agency } from '@/domain/interfaces/angecyInterface';
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

export function useUpdateAgency(agencyService: AgencyService) {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({queryKey: ['agencies']});
      console.log("Agência atualizada com sucesso:", agency);
    },
  });

  return mutation;
}
