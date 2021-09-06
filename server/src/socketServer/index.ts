import { Message } from '../entity/Message';
import { Room } from '../entity/Room';
import { jwtAuth } from './lib/middlewares';
import { initialize, mutateActives, mutateRooms } from './lib/mutate';

// socket.io 에러핸들링
// 룸 생성후 클릭하면 에러뜸
// 유저 클릭해서 방 생성하기 -> 삭제하기 -> 다른 유저 초대하기

export const SocketServer = (io: SocketIO.Server) => {
	io.use(jwtAuth);

	io.on('connection', async (socket) => {
		console.log(socket.id, `[${socket.user.name}]`, 'connected');
		console.log('all sockets: ', Object.keys(io.sockets.sockets).length);

		initialize(socket);

		// Preserved Event Handlers //
		socket.on('disconnect', async () => {
			console.log(socket.id, `[${socket.user.name}]`, 'disconnected');
			console.log('all sockets left: ', Object.keys(io.sockets.sockets).length);

			mutateActives({ user: socket.user } as SocketIO.Socket, null, 'update');
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
			const newRoom = await Room.create({ title: data }).save();
			await socket.user.setRoom(newRoom);
			const payload = { ...newRoom, users: [socket.user] };

			mutateRooms(socket, payload, 'add');
		});
	});
};
