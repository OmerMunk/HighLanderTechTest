import * as http from "http";

import socket from "socket.io";

import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

import { goalRouter } from "./routes/generateGoalRouter";


const host = 'localhost';
const port = 8000;
const serverName = 'ball-to-goal-server'

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


/**
 * Setup routes
 */
app.use('/api/v1/goal', goalRouter.getRouter());


const server = http.createServer(app);
const io: socket.Server = new socket.Server(server);

// app.listen(port, () => {
//     return console.log(`Express is listening at http://localhost:${port}`);
// });

io.on('connection', (socket: socket.Socket) => {
    console.log(`user connected`)

    socket.on('moveBall', (location: {x: number, y: number}) => {
        console.log(`moveBall: ${location.x}, ${location.y}`)
        // handle the movement of the ball
    })

    io.emit('ballMoved', location)
})

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});