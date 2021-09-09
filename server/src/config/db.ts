import { createConnection } from 'typeorm';
import { Room } from '../entity/Room';
import * as CONFIG from './constants';

export async function connectTypeORM() {
	const conn = await createConnection({
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: 'socketio_test',
		synchronize: true,
		logging: false,
		entities:
			process.env.NODE_ENV === 'production'
				? [CONFIG.DB_ENTITIES_DIR_PROD]
				: [CONFIG.DB_ENTITIES_DIR_DEV],
		migrations:
			process.env.NODE_ENV === 'production'
				? [CONFIG.DB_MIGRATION_DIR_PROD]
				: [CONFIG.DB_MIGRATION_DIR_DEV],
		subscribers:
			process.env.NODE_ENV === 'production'
				? [CONFIG.DB_SUB_DIR_PROD]
				: [CONFIG.DB_SUB_DIR_DEV],
		cli: {
			entitiesDir: 'src/entity',
			migrationsDir: 'src/migration',
			subscribersDir: 'src/subscriber',
		},
	});

	console.log(`TypeORM connection to MySQL: ${conn.isConnected}`);

	seed();
}

async function seed() {
	if (!(await Room.findOne({ where: { title: 'open chat' } }))) {
		const room = Room.create({ title: 'open chat' });
		await Room.insert(room);
	}
}
