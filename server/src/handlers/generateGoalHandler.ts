
import { currentGoal } from '../db/mockDb';

const highLanderCoordinats = {lat: 32.07790086189508, lng: 34.7905979269834}

const generateRandomCoordinates = () => {
    return {
        lat: highLanderCoordinats.lat + (Math.random() - 0.5) * 0.004,
        lng: highLanderCoordinats.lng + (Math.random() - 0.5) * 0.004
    }

}
export const generateGoalHandler = () => {
    const {lat, lng} = generateRandomCoordinates();
    currentGoal.lat = lat;
    currentGoal.lng = lng;
    return {success: true, lat, lng};
}