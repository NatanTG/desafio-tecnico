import { CreateAgencyDTO } from "../../dtos/input/agency/create-agency-dto";
import { UpdateAgencyDTO } from "../../dtos/input/agency/update-agency-dto";
import { GetAgencyByIdDTO } from "../../dtos/output/agency/get-agency-by-id-dto";
import { GetAgencyDTO } from "../../dtos/output/agency/get-agency-dto";

export interface AgencyRepository {
    getAllAgencies(): Promise<GetAgencyDTO>; 
    getAgencyById(id: string): Promise<GetAgencyByIdDTO | null>;
    createAgency(createAgencyDTO: CreateAgencyDTO): Promise<GetAgencyDTO>;  
    updateAgency(id: string, updateAgencyDTO: UpdateAgencyDTO): Promise<GetAgencyByIdDTO | null>; 
    deleteAgency(id: string): Promise<void>;  
}