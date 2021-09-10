import { Message } from '../entity/Message';
import { Room } from '../entity/Room';
import { User } from '../entity/User';
import { jwtAuth } from './lib/middlewares';
import { initialize, mutateActives, mutateRooms, mutateSocketId } from './lib/mutate';
import { GET_OPEN_CHAT } from './lib/utils';

export const socketServer = (io: SocketIO.Server) => {
	io.use(jwtAuth);

	io.on('connection', async (socket) => {
		console.log(socket.id, `[${socket.user.name}]`, 'connected');
		console.log('all sockets: ', Object.keys(io.sockets.sockets).length);

		initialize(socket);

		// Preserved Event Handlers

		socket.on('disconnect', async () => {
			console.log(socket.id, `[${socket.user.name}]`, 'disconnected');
			console.log('all sockets left: ', Object.keys(io.sockets.sockets).length);

			const OPEN_CHAT = GET_OPEN_CHAT(socket);
			if (!OPEN_CHAT) return;

			OPEN_CHAT.actives.splice(
				OPEN_CHAT.actives.findIndex(({ userId }) => userId === socket.user.uuid),
				1
			);

			mutateActives(
				{ user: socket.user } as SocketIO.Socket,
				OPEN_CHAT.actives,
				'set'
			);
		});

		socket.on('error', (error) => {
			console.log(error, 'socket.on error event');
		});

		// Custom Event Handler

		socket.on('message-add', async (data) => {
			const room = await Room.findOne({ where: { uuid: data.roomId } });

			if (!room) {
				throw new Error('chat submit error. no room found');
			}

			const newChat = await Message.create({
				message: data.data,
				user: socket.user,
			}).save();

			await newChat.setRoom(room);

			io.in(data.roomId).emit('message-add', {
				roomId: data.roomId,
				data: newChat,
			});
		});

		socket.on('room-add', async (data) => {
			const { userIds, socketIds } = data;
			const newRoom = await Room.create().save();
			const users = await User.createQueryBuilder('this')
				.where('this.uuid IN (:...userIds)', { userIds })
				.getMany();

			await Room.setUsers(newRoom, users);
			newRoom.messages = [];

			socketIds.forEach((socketId: string) => {
				if (!Object.keys(io.sockets.connected).includes(socketId)) return;
				io.sockets.sockets[socketId]?.join(newRoom.uuid);
			});

			const payload = { ...newRoom, users };
			mutateRooms(socket, payload, 'add');
		});
	});
};
