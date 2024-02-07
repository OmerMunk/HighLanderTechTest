import * as http from "http";

import socket from "socket.io";

import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

import { goalRouter } from "./routes/generateGoalRouter";
import { googleMapsAPIKeyRouter } from "./routes/getGoogleMapsAPIKeyRouter";
import {checkBallInGoalHandler} from "./handlers/checkBallInGoalHandler";



const port = 8000;

const app = express();


/**
 * Register signals and events
 */
process.on('SIGINT', () => {
    console.error(`SIGINT terminates the process`);
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.error(`SIGTERM terminates the process`);
    process.exit(0);
});

process.on('uncaughtException', (error: any): void => {
    console.error(`Uncaught exception: ${error.message} ${error.stack}`);
    process.exit(1);
});

process.on('unhandledRejection', (error: any): void => {
    console.error(`Unhandled rejection: ${error.message} ${error.stack}`);
    process.exit(1);
});

/**
 * Setup middlewares
 */
app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))



const server = http.createServer(app);
const io: socket.Server = new socket.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



io.on('connection', (socket: socket.Socket) => {
    socket.on('moveBall', (location: {lat: number, lng: number}) => {
        const result = checkBallInGoalHandler(location.lat, location.lng);
        if (result.isWithinRadius) io.emit('ballInGoal', result)

    })
})

/**
 * Setup routes
 */
app.use('/api/v1/goal', goalRouter.getRouter());
app.use('/api/v1/api', googleMapsAPIKeyRouter.getRouter());



server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});