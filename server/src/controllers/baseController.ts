import { Request, Response, NextFunction } from 'express'
import {IHandlerParams} from "../interfaces/interfaces";

interface IBaseControllerParams {
    req: Request,
    res: Response,
    functionName: string,
    logic: Function,
    next?: NextFunction,
    handlerParams?: IHandlerParams

}

/**
 * Base controller
 * @description Base controller function that handles all the logic for the controller
 * @async
 */
export const baseController = async ({req, res, next, functionName}: IBaseControllerParams) => {
    try {
        const result = await logic(handlerParams);
        if (result.success) {
            return res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error: any) {
        logger.error(`Error in ${functionName} - ${error.message} - ${error.stack}`);
        // next(error); // error handler middleware will handle the error
        res.status(500).json({success: false, error: error.message});
    }
}