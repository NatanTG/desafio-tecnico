import { PrismaClient } from "@prisma/client";
import { CreateAgencyDTO } from "../../../dtos/input/agency/create-agency-dto";
import { UpdateAgencyDTO } from "../../../dtos/input/agency/update-agency-dto";
import { GetAgencyByIdDTO } from "../../../dtos/output/agency/get-agency-by-id-dto";
import { GetAgencyDTO } from "../../../dtos/output/agency/get-agency-dto";
import { AgencyRepository } from "../agency-repository";

export class AgencyRepositoryImplementation implements AgencyRepository {

  private constructor(readonly prisma: PrismaClient) {} 

  public static build(prisma: PrismaClient): AgencyRepositoryImplementation {
    return new AgencyRepositoryImplementation(prisma);
  }

  public async getAllAgencies(): Promise<GetAgencyDTO> {
    const agencies = await this.prisma.agency.findMany();
    return {
      agency: agencies.map((a) => ({
        id: a.id,
        name: a.name,
        status: a.status,
        cnpj: a.cnpj,
        stateRegistration: a.stateRegistration,
        createdAt: a.createdAt.toString(),
        updatedAt: a.updatedAt.toString(),
      })),
    };
  }

  public async getAgencyById(id: string): Promise<GetAgencyByIdDTO | null> {
    const agency = await this.prisma.agency.findUnique({
      where: { id },
    });

    if (!agency) {
      return null;
    }

    return {
      agency: {
        id: agency.id,
        name: agency.name,
        status: agency.status,
        cnpj: agency.cnpj,
        stateRegistration: agency.stateRegistration,
        createdAt: agency.createdAt.toString(),
        updatedAt: agency.updatedAt.toString(),
      },
    };
  }

  public async createAgency(createAgencyDTO: CreateAgencyDTO): Promise<GetAgencyDTO> {
    const agency = await this.prisma.agency.create({
      data: {
        name: createAgencyDTO.name,
        status: createAgencyDTO.status,
        cnpj: createAgencyDTO.cnpj,
        stateRegistration: createAgencyDTO.stateRegistration
      },
    });

    return {
      agency: [{
        id: agency.id,
        name: agency.name,
        status: agency.status,
        cnpj: agency.cnpj,
        stateRegistration: agency.stateRegistration,
        createdAt: agency.createdAt.toString(),
        updatedAt: agency.updatedAt.toString(),
      }],
    };
  }

  public async updateAgency(id: string, updateAgencyDTO: UpdateAgencyDTO): Promise<GetAgencyByIdDTO | null> {
    const agency = await this.prisma.agency.update({
      where: { id },
      data: {
        name: updateAgencyDTO.name,
        status: updateAgencyDTO.status,
        cnpj: updateAgencyDTO.cnpj,
        stateRegistration: updateAgencyDTO.stateRegistration
      },
    });

    if (!agency) {
      return null;
    }

    return {
      agency: {
        id: agency.id,
        name: agency.name,
        status: agency.status,
        cnpj: agency.cnpj,
        stateRegistration: agency.stateRegistration,
        createdAt: agency.createdAt.toString(),
        updatedAt: agency.updatedAt.toString(),
      },
    };
  }

  public async deleteAgency(id: string): Promise<void> {
    await this.prisma.agency.delete({
      where: { id },
    });
  }
}
