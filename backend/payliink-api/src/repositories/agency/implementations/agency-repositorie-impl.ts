import { PrismaClient } from "@prisma/client";
import { CreateAgencyDTO } from "../../../dtos/input/agency/create-agency-dto";
import { UpdateAgencyDTO } from "../../../dtos/input/agency/update-agency-dto";
import { GetAgencyByIdDTO } from "../../../dtos/output/agency/get-agency-by-id-dto";
import { GetAgencyDTO } from "../../../dtos/output/agency/get-agency-dto";
import { AgencyRepository } from "../agency-repository";
import { AppError } from "../../../config/utils/app-error";

export class AgencyRepositoryImplementation implements AgencyRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient): AgencyRepositoryImplementation {
    return new AgencyRepositoryImplementation(prisma);
  }

  public async getAllAgencies(): Promise<GetAgencyDTO> {
    try {
      const agencies = await this.prisma.agency.findMany();
      return {
        agency: agencies.map((a) => ({
          id: a.id,
          name: a.name,
          status: a.status,
          cnpj: a.cnpj,
          stateRegistration: a.stateRegistration,
          founded: a.founded.toString(),
          createdAt: a.createdAt.toString(),
          updatedAt: a.updatedAt.toString(),
        })),
      };
    } catch (error) {
      console.error("Error fetching all agencies:", error);
      throw new AppError("Failed to fetch agencies.", 500);
    }
  }

  public async getAgencyById(id: string): Promise<GetAgencyByIdDTO | null> {
    try {
      const agency = await this.prisma.agency.findUnique({ where: { id } });
      return agency
        ? {
            agency: {
              id: agency.id,
              name: agency.name,
              status: agency.status,
              cnpj: agency.cnpj,
              stateRegistration: agency.stateRegistration,
              founded: agency.founded.toString(),
              createdAt: agency.createdAt.toString(),
              updatedAt: agency.updatedAt.toString(),
            },
          }
        : (() => { throw new AppError(`Agency with ID ${id} not found.`, 404); })(); 
    } catch (error) {
      console.error(`Error fetching agency with ID ${id}:`, error);
      throw new AppError("Failed to fetch agency.", 500);
    }
  }

  public async createAgency(createAgencyDTO: CreateAgencyDTO): Promise<GetAgencyDTO> {
    try {
      const existingAgency = await this.prisma.agency.findFirst({
        where: {
          OR: [
            { cnpj: createAgencyDTO.cnpj },
            { stateRegistration: createAgencyDTO.stateRegistration },
          ],
        },
      });

      if (existingAgency) {
        throw new AppError("Agency with this CNPJ or State Registration already exists.", 400);
      }

      const agency = await this.prisma.agency.create({
        data: {
          name: createAgencyDTO.name,
          status: createAgencyDTO.status,
          cnpj: createAgencyDTO.cnpj,
          founded: createAgencyDTO.founded,
          stateRegistration: createAgencyDTO.stateRegistration,
        },
      });

      return {
        agency: [
          {
            id: agency.id,
            name: agency.name,
            status: agency.status,
            cnpj: agency.cnpj,
            stateRegistration: agency.stateRegistration,
            founded: agency.founded.toString(),
            createdAt: agency.createdAt.toString(),
            updatedAt: agency.updatedAt.toString(),
          },
        ],
      };
    } catch (error) {
      console.error("Error creating agency:", error);
      throw new AppError("Failed to create agency.", 500);
    }
  }

  public async updateAgency(id: string, updateAgencyDTO: UpdateAgencyDTO): Promise<GetAgencyByIdDTO | null> {
    try {
      const existingAgency = await this.prisma.agency.findUnique({ where: { id } });

      if (!existingAgency) {
        throw new AppError(`Agency with ID ${id} not found.`, 404);
      }

      const duplicateAgency = await this.prisma.agency.findFirst({
        where: {
          OR: [
            { cnpj: updateAgencyDTO.cnpj },
            { stateRegistration: updateAgencyDTO.stateRegistration },
          ],
        },
      });

      if (duplicateAgency) {
        throw new AppError("Agency with this CNPJ or State Registration already exists.", 400);
      }

      const agency = await this.prisma.agency.update({
        where: { id },
        data: {
          name: updateAgencyDTO.name,
          status: updateAgencyDTO.status,
          cnpj: updateAgencyDTO.cnpj,
          stateRegistration: updateAgencyDTO.stateRegistration,
          founded: updateAgencyDTO.founded,
        },
      });

      return {
        agency: {
          id: agency.id,
          name: agency.name,
          status: agency.status,
          cnpj: agency.cnpj,
          stateRegistration: agency.stateRegistration,
          founded: agency.founded.toString(),
          createdAt: agency.createdAt.toString(),
          updatedAt: agency.updatedAt.toString(),
        },
      };
    } catch (error) {
      console.error(`Error updating agency with ID ${id}:`, error);
      throw new AppError("Failed to update agency.", 500);
    }
  }
  public async deleteAgency(id: string): Promise<void> {
    try {
      const agency = await this.prisma.agency.findUnique({ where: { id } });
  
      return agency
        ? await this.prisma.agency.delete({ where: { id } }).then(() => Promise.resolve()) 
        : (() => { throw new AppError(`Agency with ID ${id} not found.`, 404); })(); 
  
    } catch (error) {
      console.error(`Error deleting agency with ID ${id}:`, error);
      throw new AppError("Failed to delete agency.", 500);
    }
  }
  
}
