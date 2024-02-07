import {
    RequestHandler,
} from 'express';
import {EHttpMethods} from "../enums/enums";

/**
 * IHandlerParams
 * @interface
 * @description: Interface for the handler params object
 */
export interface IHandlerParams {
    body?: Record<string, any>
    query?: Record<string, any>
    params?: Record<string, any>
    headers?: Record<string, any>
}


/**
 * IRoute
 * @interface
 * @description: Interface for the route object
 */
export interface IRoute {
    endPoint: string;
    controller: RequestHandler;
    middlewares?: RequestHandler[];
    method: EHttpMethods;
}