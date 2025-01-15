import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AgencyService } from "@/data/services/agency/agencyService";

export function useDelete(agencyService: AgencyService) {
  const mutation: UseMutationResult<void, Error, string> = useMutation({
    mutationFn: async (userId: string) => {
      await agencyService.delete(userId); 
    },
    onError: (error: Error) => {
      console.error("Erro ao deletar o usuário:", error);
    },
    onSuccess: () => {
      console.log("Usuário deletado com sucesso");
    },
  });

  return mutation;
}
