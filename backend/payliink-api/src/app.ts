import express from "express";
import { ApiExpress } from "./app/express/express";
import routes from "./config/routes";
import passport from "passport";
import cors from "cors";
import { prisma } from "./config/dependencies/dependencies";

const api = ApiExpress.build();
api.app.use(express.json());
api.app.use(passport.initialize());

api.app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

api.app.use(routes);

api.app.use(
  (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack); 
    res.status(500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    });
  }
);

async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
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
