import {IRoute} from "../interfaces/interfaces";
import {BaseRouter} from "./baseRouter";
import {generateGoalController} from "../controllers/generateGoalController";
import {EHttpMethods} from "../enums/enums";


const goalRoutes: IRoute[] = [
    {
        endPoint: '/generate-goal',
        controller: generateGoalController,
        middlewares: [],
        method: EHttpMethods.GET
    }
]

export const goalRouter: BaseRouter = new BaseRouter(
    goalRoutes,
    '/'
);