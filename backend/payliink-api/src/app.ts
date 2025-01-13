import express from "express";
import { ApiExpress } from "./app/express/express";
import { PrismaClient } from "@prisma/client";
import routes from "./config/routes";

const app = express();

const prisma = new PrismaClient();

const api = ApiExpress.build();
api.app.use(express.json());

api.app.use("/api", routes);

api.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

export default api ; prisma ;
