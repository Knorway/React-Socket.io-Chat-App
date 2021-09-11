import { io } from '../../app';
import { Message } from '../../entity/Message';
import { Room } from '../../entity/Room';
import { mutateMessages } from '../lib/mutate';

export const add = (socket: SocketIO.Socket) => async (data: any) => {
	const room = await Room.findOne({ where: { uuid: data.roomId } });

	if (!room) {
		throw new Error('chat submit error. no room found');
	}

	const newChat = await Message.create({
		message: data.data,
		user: socket.user,
	}).save();

	await newChat.setRoom(room);

	// io.in(data.roomId).emit('message-add', {
	// 	roomId: data.roomId,
	// 	data: newChat,
	// });
	const payload = { roomId: data.roomId, data: newChat };
	mutateMessages(socket, payload, 'add');
};
