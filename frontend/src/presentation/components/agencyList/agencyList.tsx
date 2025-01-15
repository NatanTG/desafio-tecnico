import { useEffect, useState } from "react";
import { useUpdateAgency } from "@/hooks/useUpdateAgency";
import { AgencyCard } from "../agencyCard/agencyCard";
import { AgencyServiceImpl } from "@/data/services/agency/implementations/agencyServiceImpl";
import { Agency } from "@/domain/interfaces/angecyInterface";
import { useAgencies } from "@/hooks/useAgencyHook";
import { Button } from "../ui/button";

const AgencyList = () => {
  const agencyService = new AgencyServiceImpl();
  const { agencies, isLoading, isError, error, refetch } = useAgencies(agencyService);
  const { mutate: updateAgency } = useUpdateAgency(agencyService);
  
  const [shouldRefetch, setShouldRefetch] = useState(false); 

  const handleSave = (updatedAgency: Agency) => {
    updateAgency(updatedAgency); 
    setShouldRefetch(true);
  };

  const handleDelete = async (agencyId: string) => {
    try {
      await agencyService.delete(agencyId);
      console.log(`Agência com ID ${agencyId} excluída com sucesso`);
      setShouldRefetch(true); 
    } catch (error) {
      console.error("Erro ao excluir a agência:", error);
    }
  };



  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false); 
    }
  }, [shouldRefetch, refetch]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro: {(error as Error).message}</div>;
  }

  return (
    <div className="p-6">
   

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {agencies?.map((agency: Agency) => (
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
                        <AgencyCard
              {...agency}
              onDelete={() => handleDelete(agency.id)}  
              onSave={handleSave}  
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyList;
