import { Request, Response, NextFunction } from "express";
import { AppError } from "../config/utils/app-error";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
}
