import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    console.log("Conteúdo de req.user:", req.user);

    const user = req.user as { role: string };

    if (!user || user.role !== "ADMIN") {
      
        res.status(403).json({ message: "Access denied. Admins only." });
        return 
    }

    next();
  } catch (error) {
    next(error); 
  }
};
