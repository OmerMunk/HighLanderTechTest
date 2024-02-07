import {NextFunction, Request, Response} from "express";
import {baseController} from "./baseController";
import {generateGoalHandler} from "../handlers/generateGoalHandler";

export const generateGoalController = async (req: Request, res: Response, next: NextFunction) => {
    await baseController({req, res, next, functionName: generateGoalController.name, logic: generateGoalHandler});
}