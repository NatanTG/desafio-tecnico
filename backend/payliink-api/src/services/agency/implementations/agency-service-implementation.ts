import { CreateAgencyDTO } from "../../../dtos/input/agency/create-agency-dto";
import { UpdateAgencyDTO } from "../../../dtos/input/agency/update-agency-dto";
import { GetAgencyByIdDTO } from "../../../dtos/output/agency/get-agency-by-id-dto";
import { GetAgencyDTO } from "../../../dtos/output/agency/get-agency-dto";
import { AgencyRepository } from "../../../repositories/agency/agency-repository";
import { AgencyService } from "../agency-service";

export class AgencyServiceImplementation implements AgencyService{
    
  private constructor(private repository: AgencyRepository) {}

  public static build(agencyRepository: AgencyRepository): AgencyServiceImplementation {
    return new AgencyServiceImplementation(agencyRepository);
  }
    
  public async getAllAgencies(): Promise<GetAgencyDTO> {
    const allAgencys = await this.repository.getAllAgencies();
    const agencys = allAgencys.agency.map((a) => {
      return {
        id: a.id,
        name: a.name,
        status: a.status,
        cnpj: a.cnpj,
        stateRegistration: a.stateRegistration,
        createdAt: a.createdAt.toString(),
        updatedAt: a.updatedAt.toString(),
      };
    });

    const output: GetAgencyDTO = {
      agency: agencys,
    };

    return output;
  }

  public async getAgencyById(id: string): Promise<GetAgencyByIdDTO | null> {
    const agencyById = await this.repository.getAgencyById(id);
    return agencyById || null;
  }

  public async createAgency(agencyData: CreateAgencyDTO): Promise<GetAgencyDTO> {
    const createdAgency = await this.repository.createAgency(agencyData);
    return createdAgency;
  }

  public async updateAgency(id: string, agencyData: UpdateAgencyDTO): Promise<GetAgencyByIdDTO | null> {
    const updatedAgency = await this.repository.updateAgency(id, agencyData);
    return !updatedAgency
      ? null
      : {
          agency: {
            id: updatedAgency.agency.id,
            name: updatedAgency.agency.name,
            status: updatedAgency.agency.status,
            cnpj: updatedAgency.agency.cnpj,
            stateRegistration: updatedAgency.agency.stateRegistration,
            createdAt: updatedAgency.agency.createdAt.toString(),
            updatedAt: updatedAgency.agency.updatedAt.toString(),
          },
        };
  }

  public async deleteAgency(id: string): Promise<void> {
    const agency = await this.repository.getAgencyById(id);
    !agency ? Promise.reject(new Error("Agency not found")) : await this.repository.deleteAgency(id);
  }
}