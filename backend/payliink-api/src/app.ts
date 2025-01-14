import express from "express";
import { ApiExpress } from "./app/express/express";
import { PrismaClient } from "@prisma/client";
import routes from "./config/routes";
import passport from "passport";
import { prisma } from "./config/dependencies/dependencies";


const api = ApiExpress.build();
api.app.use(express.json());
api.app.use(passport.initialize());
api.app.use("/api",routes);

api.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

async function connectDatabase() {
    try {
        await prisma.$connect(); 
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

const startServer = async () => {
    await connectDatabase();
    const PORT = process.env.PORT || 3000;
    
    api.app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
