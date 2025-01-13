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
    } catch (error) {
      res.status(500).json({ error: "500 Internal Error" });
    }
  }

  public async getAgencyById(req: Request, res: Response): Promise<void> {
    try {
      const agency = await this.agencyService.getAgencyById(req.params.id);
      if (agency) {
        res.status(200).json(agency);
      } else {
        res.status(404).json({ message: "Agency not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "500 Internal Error" });
    }
  }

  public async updateAgency(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const agencyData = req.body;

      if (!id) {
        res.status(400).json({ message: "Agency ID is required" });
        return;
      }

      const updatedAgency = await this.agencyService.updateAgency(id, agencyData);

      if (!updatedAgency) {
        res.status(404).json({ message: "Agency not found" });
        return;
      }

      res.status(200).json(updatedAgency);
    } catch (error) {
      res.status(500).json({ error: "500 Internal Error" });
    }
  }

  public async deleteAgency(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Agency ID is required" });
        return;
      }

     
      const deletedAgency = await this.agencyService.deleteAgency(id);
      res.status(200).json({ message: "Agency deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "500 Internal Error" });
    }
  }
}