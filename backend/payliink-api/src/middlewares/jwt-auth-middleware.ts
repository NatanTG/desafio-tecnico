import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function JwtAuthMiddleware( req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
      res.status(401).json({ message: "No token provided" });
      return ;
  }

  try {
    const secretKey = process.env.JWT_SECRET || "VLFs5cFKepvUA8uwIZ51Z3P2B1QNYGEv8YoYAXd9TUY=";
    const decode = jwt.verify(token, secretKey);
    req.user = decode; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}