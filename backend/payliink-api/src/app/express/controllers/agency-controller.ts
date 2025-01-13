import { Request, Response } from "express";
import { AgencyService } from "../../../services/agency/agency-service";

export class AgencyController {
  private constructor(private agencyService: AgencyService) {}

  public static build(agencyService: AgencyService): AgencyController {
    return new AgencyController(agencyService);
  }

  public async getAllAgencies(req: Request, res: Response): Promise<void> {
    try {
      const agencies = await this.agencyService.getAllAgencies();
      res.status(200).json(agencies);
    } catch (error) {
      res.status(500).json({ error: "500 Internal Error" });
    }
  }

  public async createAgency(req: Request, res: Response): Promise<void> {
    try {
      const agency = await this.agencyService.createAgency(req.body);
      res.status(201).json(agency);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "500 Internal Error" });
    }
  }

  public async getAgencyById(req: Request, res: Response): Promise<void> {
    try {
      const agency = await this.agencyService.getAgencyById(req.params.id);
      agency
        ? res.status(200).json(agency)
        : res.status(404).json({ message: "Agency not found" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "500 Internal Error" });
    }
  }

  public async updateAgency(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const agencyData = req.body;

      !id
        ? res.status(400).json({ message: "Agency ID is required" })
        : await this.agencyService.updateAgency(id, agencyData)
            .then(updatedAgency => {
              !updatedAgency
                ? res.status(404).json({ message: "Agency not found" })
                : res.status(200).json(updatedAgency);
            })
            .catch(error => {
              throw new Error(error);
            });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "500 Internal Error" });
    }
  }

  public async deleteAgency(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Agency ID is required" });
      return 
    }

    try {
      const deletedAgency = await this.agencyService.deleteAgency(id);
      if (deletedAgency == null) {
        res.status(404).json({ message: "Agency not found" });
        return 
      }
      res.status(200).json({ message: "Agency deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "500 Internal Error" });
    }
  }
}