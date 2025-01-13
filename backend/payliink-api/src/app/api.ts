// api.ts
export interface Api {
    start(port: number): void;
    addRoute(
        method: "get" | "post" | "put" | "delete" | "patch",
        path: string,
        handler: (req: Request, res: Response) => void
    ): void;
}
