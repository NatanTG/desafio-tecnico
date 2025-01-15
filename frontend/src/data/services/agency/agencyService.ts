import { Agency } from "@/domain/interfaces/angecyInterface";

export interface AgencyService {
  getAll(): Promise<Agency[]>;
  getById(id: string): Promise<Agency>;
  create(data: Omit<Agency, 'id'>): Promise<Agency>;
  update(id: string, data: Partial<Agency>): Promise<void>;
  delete(id: string): Promise<void>;
}
