import {IRoute} from "../interfaces/interfaces";
import {BaseRouter} from "./baseRouter";
import {getGoogleMapsAPIKeyController} from "../controllers/getGoogleMapsAPIKeyController";
import {EHttpMethods} from "../enums/enums";


const googleMapsAPIKeyRoutes: IRoute[] = [
    {
        endPoint: '/google-maps-api-key',
        controller: getGoogleMapsAPIKeyController,
        middlewares: [],
        method: EHttpMethods.GET
    }
]

export const googleMapsAPIKeyRouter: BaseRouter = new BaseRouter(
    googleMapsAPIKeyRoutes,
    '/'
);