import { createConnection } from 'typeorm';
import { Room } from '../entity/Room';
import * as CONFIG from './constants';

export async function connectTypeORM() {
	const conn = await createConnection({
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: CONFIG.DB_USERNAME,
		password: CONFIG.DB_PASSWROD,
		database: 'socketio_test',
		synchronize: true,
		logging: true,
		entities: [CONFIG.DB_ENTITIES_DIR],
		migrations: [CONFIG.DB_MIGRATION_DIR],
		subscribers: [CONFIG.DB_SUB_DIR],
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
