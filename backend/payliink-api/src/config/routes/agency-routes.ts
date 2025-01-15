import { Router } from "express";

import { passportMiddleware } from "../../middlewares/passport-middleware";
import { isAdmin } from "../../middlewares/role-auth-middleware";
import { AgencyController } from "../../app/express/controllers/agency-controller";
import { JwtAuthMiddleware } from "../../middlewares/jwt-auth-middleware";
import { agencyService } from "../dependencies/dependencies";

const agencyController = AgencyController.build(agencyService);
const agencyRouter = Router();

agencyRouter.use(JwtAuthMiddleware);

agencyRouter.get("/", async (req, res) => {
  try {
    await agencyController.getAllAgencies(req, res);
  } catch (error) {
    console.error("Error getting all agencies:", error);
    res.status(500).json({ message: "An error occurred while fetching all agencies." });
  }
});

agencyRouter.post("/", async (req, res) => {
  try {
    await agencyController.createAgency(req, res);
  } catch (error) {
    console.error("Error creating agency:", error);
    res.status(500).json({ message: "An error occurred while creating the agency." });
  }
});

agencyRouter.get("/:id", async (req, res) => {
  try {
    await agencyController.getAgencyById(req, res);
  } catch (error) {
    console.error(`Error getting agency with ID ${req.params.id}:`, error);
    res.status(500).json({ message: `An error occurred while fetching agency with ID ${req.params.id}.` });
  }
});

agencyRouter.put("/:id", async (req, res) => {
  try {
    await agencyController.updateAgency(req, res);
  } catch (error) {
    console.error(`Error updating agency with ID ${req.params.id}:`, error);
    res.status(500).json({ message: `An error occurred while updating agency with ID ${req.params.id}.` });
  }
});

agencyRouter.delete("/:id", passportMiddleware, isAdmin, async (req, res) => {
  try {
    await agencyController.deleteAgency(req, res);
  } catch (error) {
    console.error(`Error deleting agency with ID ${req.params.id}:`, error);
    res.status(500).json({ message: `An error occurred while deleting agency with ID ${req.params.id}.` });
  }
});

export default agencyRouter;
