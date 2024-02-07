import {currentGoal} from "../db/mockDb";

import * as turf from '@turf/turf';

const radius = 10; // Radius in meters


/**
 * Check if the ball is in the goal radius
 * @param x
 * @param y
 */
export const checkBallInGoalHandler = (lat: number, lng: number) => {
    console.log(`inside checkBallInGoalHandler with lat: ${lat} and lng: ${lng}`);
    const ballCoordinates = turf.point([lat, lng]);
    console.log(`ballCoordinates: ${JSON.stringify(ballCoordinates)}`);
    const goalCoordinates = turf.point([currentGoal.lat, currentGoal.lng]);
    console.log(`goalCoordinates: ${JSON.stringify(goalCoordinates)}`);
    const distance = turf.distance(ballCoordinates, goalCoordinates, {units: 'meters'});
    console.log(`distance: ${distance}`);
    const isWithinRadius = distance <= radius;
    return {success: true, isWithinRadius};
}
//todo: would deep dive more into turf and how it works.
// todo: would use turf as an absraction for the geoservice functionalities.