import { io } from '../../app';
import { Room } from '../../entity/Room';
import { User } from '../../entity/User';
import { mutateRooms } from '../lib/mutate';

export const add = (socket: SocketIO.Socket) => async (data: any) => {
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
};
