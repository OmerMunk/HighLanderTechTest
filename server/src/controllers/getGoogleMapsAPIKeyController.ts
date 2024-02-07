import {NextFunction, Request, Response} from "express";
import {baseController} from "./baseController";
import {getGoogleMapsAPIKeyHandler} from "../handlers/getGoogleMapsAPIKeyHandler";

export const getGoogleMapsAPIKeyController = async (req: Request, res: Response, next: NextFunction) => {
    await baseController({
        req,
        res,
        next,
        functionName: getGoogleMapsAPIKeyController.name,
        logic: getGoogleMapsAPIKeyHandler
    });
}