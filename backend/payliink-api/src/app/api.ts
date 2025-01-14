import { Request, Response } from "express";

export interface Api {
    start(port: number): void;
    addRoute(
        method: "get" | "post" | "put" | "delete" | "patch",
        path: string,
        handler: (req: Request<any, any, any, any>, res: Response) => void
    ): void;
}
