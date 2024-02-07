import express from 'express';


const host = 'localhost';
const port = 3000;
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


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});