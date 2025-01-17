import { Api } from "../api";
import express, { Express, Request, Response } from "express";

export class ApiExpress implements Api {
    private constructor(readonly app: Express) {}
    

    public addRoute(
        method: "get" | "post" | "put" | "delete" | "patch",
        path: string,
        handler: (req: Request<any, any, any, any>, res: Response) => void
    ): void {
        this.app[method](path, handler);
    }

    public static build() {
        const app = express();
        app.use(express.json());
        return new ApiExpress(app);
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log("Server running on port " + port);
            this.printRoutes();
        });
    }

    private printRoutes() {
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                };
            });

        console.log(routes);
    }
}
