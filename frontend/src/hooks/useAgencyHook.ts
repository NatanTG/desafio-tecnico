import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AgencyService } from "@/data/services/agency/agencyService"; 
import { AgenciesResponse } from "@/domain/interfaces/angecyInterface";

export function useAgencies(agencyService: AgencyService) {
  const { data: agenciesResponse, isLoading, isError, error, refetch }: UseQueryResult<AgenciesResponse, Error> = useQuery({
    queryKey: ['agencies'],
    queryFn: async () => {
      const response = await agencyService.getAll(); 
      return response; 
    }
  });

  const agenciesData = agenciesResponse?.agency || []; 
  return { agencies: agenciesData, isLoading, isError, error, refetch};
}
