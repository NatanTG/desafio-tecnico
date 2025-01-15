import { CreateAgencyDTO } from "../../../dtos/input/agency/create-agency-dto";
import { UpdateAgencyDTO } from "../../../dtos/input/agency/update-agency-dto";
import { GetAgencyByIdDTO } from "../../../dtos/output/agency/get-agency-by-id-dto";
import { GetAgencyDTO } from "../../../dtos/output/agency/get-agency-dto";
import { AgencyRepository } from "../../../repositories/agency/agency-repository";
import { AgencyService } from "../agency-service";

export class AgencyServiceImplementation implements AgencyService {
  private constructor(private repository: AgencyRepository) {}

  public static build(agencyRepository: AgencyRepository): AgencyServiceImplementation {
    return new AgencyServiceImplementation(agencyRepository);
  }

  public async getAllAgencies(): Promise<GetAgencyDTO> {
    const { agency } = await this.repository.getAllAgencies(); 
    return {
      agency: agency.map(({ id, name, status, cnpj, stateRegistration, founded, createdAt, updatedAt }) => ({
        id,
        name,
        status,
        cnpj,
        stateRegistration,
        founded: founded.toString(),
        createdAt: createdAt.toString(),
        updatedAt: updatedAt.toString(),
      })),
    };
  }

  public async getAgencyById(id: string): Promise<GetAgencyByIdDTO | null> {
    return await this.repository.getAgencyById(id) || null; 
  }

  public async createAgency(agencyData: CreateAgencyDTO): Promise<GetAgencyDTO> {
    return await this.repository.createAgency(agencyData);
  }

  public async updateAgency(id: string, agencyData: UpdateAgencyDTO): Promise<GetAgencyByIdDTO | null> {
    const updatedAgency = await this.repository.updateAgency(id, agencyData);
    return updatedAgency
      ? {
          agency: {
            id: updatedAgency.agency.id,
            name: updatedAgency.agency.name,
            status: updatedAgency.agency.status,
            cnpj: updatedAgency.agency.cnpj,
            stateRegistration: updatedAgency.agency.stateRegistration,
            founded: updatedAgency.agency.founded.toString(),
            createdAt: updatedAgency.agency.createdAt.toString(),
            updatedAt: updatedAgency.agency.updatedAt.toString(),
          },
        }
      : null; 
  }

  public async deleteAgency(id: string): Promise<void> {
    const agency = await this.repository.getAgencyById(id);
    agency
      ? await this.repository.deleteAgency(id)
      : Promise.reject(new Error("Agency not found")); 
  }
}
