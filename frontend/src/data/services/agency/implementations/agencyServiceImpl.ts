import { Agency } from "@/domain/interfaces/angecyInterface";
import { api } from "../../api/api";
import { AgencyService } from "../agencyService";

export class AgencyServiceImpl implements AgencyService {
  async getAll(): Promise<Agency[]> {
    const response = await api.get<Agency[]>('/agency');
    console.log(response.data); 
    return response.data;
  }

  async getById(id: string): Promise<Agency> {
    const response = await api.get<Agency>(`/agency/${id}`);
    return response.data;
  }

  async create(data: Omit<Agency, 'id'>): Promise<Agency> {
    const response = await api.post<Agency>('/agency', data);
    return response.data;
  }

  async update(id: string, data: Partial<Agency>): Promise<void> {
    await api.put(`/agency/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/agency/${id}`);
  }
}
