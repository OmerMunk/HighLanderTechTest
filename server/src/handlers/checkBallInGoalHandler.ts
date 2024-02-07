import {currentGoal} from "../db/mockDb";

import * as turf from '@turf/turf';

// Example: Generate a random goal within a 10km radius around a center point
const radius = 10; // Radius in meters


/**
 * Check if the ball is in the goal radius
 * @param x
 * @param y
 */
export const checkBallInGoalHandler = (x: number, y: number) => {
    const ballCoordinates = turf.point([x, y]);
    const goalCoordinates = turf.point([currentGoal.x, currentGoal.y]);
    const distance = turf.distance(ballCoordinates, goalCoordinates, {units: 'meters'});
    const isWithinRadius = distance <= radius;
    return {success: true, isWithinRadius};
}
//todo: would deep dive more into turf and how it works.
// todo: would use turf as an absraction for the geoservice functionalities.