import { Router } from 'express';
import { EHttpMethods} from "../enums/enums";
import { IRoute } from "../interfaces/interfaces";

/**
 * Class BaseRouter
 * @description Base router class that handles all the logic for the router
 * @class
 * @param routes IRoute interface object that contains method, endPoint, controller objects as parameters for base router class
 * @param prefix string that contains the prefix for the router
 * @returns void
 * @example
 * const routes: IRoute[] = [
 * {
 * method: EMethods.GET,
 * endPoint: '/test',
 * controller: testController,
 * },
 * export const router = new BaseRouter(routes, '/api/v1');
 */
export class BaseRouter {
    /**
     * @description Express router object
     * @private
     */
    private readonly router: Router;
    /**
     * @description Array of routes that will be used to set up the router
     * @private
     */
    private routes: IRoute[];
    /**
     * @description Prefix for the router
     * @private
     */
    private readonly prefix: string | undefined;

    constructor(routes: IRoute[], prefix?: string) {
        this.prefix = prefix;
        this.router = Router();
        this.routes = routes;
        this.setupRoutes();
    }

    /**
     * @description Getter for the prefix
     * @returns string | undefined
     */
    public getPrefix(): string | undefined {
        return this.prefix;
    }

    /**
     * @description Method that sets up the routes for the router
     * @returns void
     * @protected
     */
    protected setupRoutes(): void {
        // Define base routes that every route should have

        // TODO handle middlewares
        this.routes.map((route: IRoute) => {
            switch (route.method) {
                case EHttpMethods.GET:
                    if (route.middlewares?.length) {
                        this.router.get(
                            route.endPoint,
                            ...route.middlewares,
                            route.controller
                        );
                        break;
                    } else {
                        this.router.get(route.endPoint, route.controller);
                        break;
                    }

                case EHttpMethods.POST:
                    if (route.middlewares?.length) {
                        this.router.post(
                            route.endPoint,
                            ...route.middlewares,
                            route.controller
                        );
                        break;
                    } else {
                        this.router.post(route.endPoint, route.controller);
                        break;
                    }

                default:
                    break;
            }
        });
    }

    /**
     * @description Getter for the router
     */
    public getRouter(): Router {
        return this.router;
    }
}
