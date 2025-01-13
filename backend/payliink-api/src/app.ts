import express from "express";
import { ApiExpress } from "./app/express/express";
import { PrismaClient } from "@prisma/client";
import routes from "./config/routes";

// Inicializa a API
const app = express();

// Configuração do Prisma
const prisma = new PrismaClient();

// Configuração do servidor Express
const api = ApiExpress.build();
api.app.use(express.json()); // Middleware para parsing de JSON

// Registro de rotas
api.app.use("/api", routes); // Conecta todas as rotas definidas

// Configuração global de middlewares (ex.: tratamento de erros)
api.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Exporta o app para inicialização no servidor
export default api ; prisma ;
