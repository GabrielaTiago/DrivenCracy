import 'express-async-errors';
import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { config } from 'dotenv';
import errorHandler from './middleware/errorHandler.js';
import router from './routes/router.js';

config();

const server = express();

server.use(json(), cors());

server.use(router);
server.use(errorHandler);

const PORT = Number(process.env.PORT) || 5500;

server.listen(PORT, () => {
	console.log(chalk.bold.green(`The server is up and runnig on port ${PORT}`));
});
