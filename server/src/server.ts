import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { app, io, server } from './app';
import { ConnectTypeORM } from './config/db';
import { SocketServer } from './socketServer';

const bootstrap = async () => {
	try {
		await ConnectTypeORM();

		SocketServer(io);

		server.listen(app.get('port'), () => {
			console.log(`ON! -> http://localhost:${app.get('port')}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

bootstrap();
