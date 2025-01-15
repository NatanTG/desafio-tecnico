import { useEffect, useState } from "react";
import { useUpdateAgency } from "@/hooks/useUpdateAgency";
import { AgencyCard } from "../agencyCard/agencyCard";
import { AgencyServiceImpl } from "@/data/services/agency/implementations/agencyServiceImpl";
import { Agency } from "@/domain/interfaces/angecyInterface";
import { useAgencies } from "@/hooks/useAgencyHook";
import { SearchBar } from "../searchBar/searchBar";
import { CreateAgency } from "../createAgency/createAgency";

const AgencyList = () => {
  const agencyService = new AgencyServiceImpl();
  const { agencies, isLoading, isError, error, refetch } = useAgencies(agencyService);
  const { mutate: updateAgency } = useUpdateAgency(agencyService);
  
  const [shouldRefetch, setShouldRefetch] = useState(false); 
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false); 
    }
  }, [shouldRefetch, refetch]);

  useEffect(() => {
    let filtered = agencies || [];
    if (searchTerm) {
      filtered = filtered.filter(agency => agency.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (statusFilter) {
      filtered = filtered.filter(agency => agency.status === statusFilter);
    }
    setFilteredAgencies(filtered);
  }, [agencies, searchTerm, statusFilter]);

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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (status: string) => {
    setStatusFilter(status);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return <div>Erro: {(error as Error).message}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
        <CreateAgency />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgencies.map((agency: Agency) => (
          <AgencyCard
            key={agency.id}
            {...agency}
            onDelete={() => handleDelete(agency.id)}  
            onSave={handleSave}  
          />
        ))}
      </div>
    </div>
  );
};

export default AgencyList;