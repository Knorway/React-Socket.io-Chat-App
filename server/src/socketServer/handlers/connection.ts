import { io } from '../../app';
import { User } from '../../entity/User';
import { mutateActives, mutateRooms, mutateSocketId, mutateUsers } from '../lib/mutate';
import { GET_OPEN_CHAT } from '../lib/utils';

export const initialize = async (socket: SocketIO.Socket) => {
	console.log(socket.id, `[${socket.user.name}]`, 'connected');
	console.log('all sockets: ', Object.keys(io.sockets.sockets).length);

	const rooms = await User.getAllRoomsOf(socket.user.id);
	const users = await User.find({});

	if (!rooms) {
		throw new Error('socket initialization error. no rooms found for the user.');
	}

	rooms.forEach((room) => socket.join(room.uuid));

	const OPEN_CHAT = GET_OPEN_CHAT(socket);
	if (!OPEN_CHAT) return;

	if (!OPEN_CHAT.actives) {
		OPEN_CHAT.actives = [{ socketId: socket.id, userId: socket.user.uuid }];
	} else {
		OPEN_CHAT.actives.push({ socketId: socket.id, userId: socket.user.uuid });
	}

	mutateRooms(socket, rooms, 'set');
	mutateUsers(socket, users, 'set');
	mutateActives(socket, OPEN_CHAT.actives, 'set');
	mutateSocketId(socket, null, 'update');
};

export const disconnect = (socket: SocketIO.Socket) => () => {
	console.log(socket.id, `[${socket.user.name}]`, 'disconnected');
	console.log('all sockets left: ', Object.keys(io.sockets.sockets).length);

	const OPEN_CHAT = GET_OPEN_CHAT(socket);
	if (!OPEN_CHAT) return;

	OPEN_CHAT.actives.splice(
		OPEN_CHAT.actives.findIndex(({ userId }) => userId === socket.user.uuid),
		1
	);

	mutateActives({ user: socket.user } as SocketIO.Socket, OPEN_CHAT.actives, 'set');
};

export const error = () => (error: any) => {
	console.log(error);
};
