import { Router } from "express";
import { JwtAuthMiddleware } from "../../middlewares/jwt-auth-middleware";
import { AgencyController } from "../../app/express/controllers/agency-controller";
import { agencyService } from "../dependencies/dependencies";

const agencyController = AgencyController.build(agencyService);
const agencyRouter = Router();

agencyRouter.use(JwtAuthMiddleware);

agencyRouter.get("/", (req, res) => agencyController.getAllAgencies(req, res)); 
agencyRouter.post("/", (req, res) => agencyController.createAgency(req, res)); 
agencyRouter.get("/:id", (req, res) => agencyController.getAgencyById(req, res));
agencyRouter.put("/:id", (req, res) => agencyController.updateAgency(req, res)); 
agencyRouter.delete("/:id", (req, res) => agencyController.deleteAgency(req, res));

export default agencyRouter ;