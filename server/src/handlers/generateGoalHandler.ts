
import { currentGoal } from '../db/mockDb';
const generateRandomCoordinates = () => {
    return {
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 1000)
    }

}
export const generateGoalHandler = () => {
    const {x, y} = generateRandomCoordinates();
    currentGoal.x = x;
    currentGoal.y = y;
    return {success: true, x, y};
}