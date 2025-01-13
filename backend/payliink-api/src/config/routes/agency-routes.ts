import { Router } from "express";
import { JwtAuthMiddleware } from "../../middlewares/jwt-auth-middleware";
import { AgencyController } from "../../app/express/controllers/agency-controller";
import { agencyService } from "../dependencies/dependencies";

const agencyController = AgencyController.build(agencyService);
const agencyRouter = Router();

agencyRouter.use(JwtAuthMiddleware);

agencyRouter.get("/", (req, res) => agencyController.getAllAgencies(req, res)); // Lista todas as agências
agencyRouter.post("/", (req, res) => agencyController.createAgency(req, res)); // Adiciona uma nova agência
agencyRouter.get("/:id", (req, res) => agencyController.getAgencyById(req, res)); // Exibe os detalhes de uma agência específica
agencyRouter.put("/:id", (req, res) => agencyController.updateAgency(req, res)); // Atualiza as informações de uma agência
agencyRouter.delete("/:id", (req, res) => agencyController.deleteAgency(req, res)); // Remove uma agência

export default agencyRouter ;