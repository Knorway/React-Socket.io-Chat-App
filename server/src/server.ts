import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { app, server } from './app';
import { ConnectTypeORM } from './config/db';

const bootstrap = async () => {
	try {
		await ConnectTypeORM();

		server.listen(app.get('port'), () => {
			console.log(`ON! -> http://localhost:${app.get('port')}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

bootstrap();
