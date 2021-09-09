import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { app, io, server } from './app';
import { connectTypeORM } from './config/db';
import { socketServer } from './socketServer';

const bootstrap = async () => {
	try {
		await connectTypeORM();
		socketServer(io);
		server.listen(app.get('port'), () => {
			console.log(`ON! -> http://localhost:${app.get('port')}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

bootstrap();
