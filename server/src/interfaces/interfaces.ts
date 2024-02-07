/**
 * IHandlerParams
 * @interface
 * @description: Interface for the handler params object
 */
export interface IHandlerParams {
    body?: Request<string, any>;
    query?: Request<string, any>;
    params?: Request<string, any>;
    headers?: Request<string, any>;
}