import { io } from '../../app';
import { User } from '../../entity/User';

type SuffixType = 'set' | 'update' | 'add' | 'remove';
type MutateFunction = (socket: SocketIO.Socket, payload: any, suffix: SuffixType) => void;

export const mutateRooms: MutateFunction = (socket, rooms, suffix) => {
	switch (suffix) {
		case 'set':
		case 'add':
			socket.emit(`room-${suffix}`, rooms);
			return;
	}
};

export const mutateUsers: MutateFunction = (socket, users, suffix) => {
	switch (suffix) {
		case 'set':
			socket.emit(`user-${suffix}`, users);
			return;
	}
};

export const mutateActives: MutateFunction = async (socket, payload, suffix) => {
	const openChat = socket.user.getOpenChat();
	const openChatId = openChat?.uuid as string;
	const OPEN_CHAT = io.sockets.adapter.rooms[openChatId] as any;
	if (!OPEN_CHAT) return;

	switch (suffix) {
		case 'set':
			io.emit(`active-${suffix}`, OPEN_CHAT.actives);
			return;

		case 'update':
			OPEN_CHAT.actives = OPEN_CHAT.actives.filter(
				(active: string) => active !== socket.user.uuid
			);
			io.emit(`active-${suffix}`, OPEN_CHAT.actives);
			return;
	}
};

export const initialize = async (socket: SocketIO.Socket) => {
	const openChat = socket.user.getOpenChat();
	const rooms = await User.getAllRoomsOf(socket.user.id);
	const users = await User.find({});

	if (!rooms) {
		throw new Error('socket initialization error. no rooms found for the user.');
	}

	rooms.forEach((room) => socket.join(room.uuid));

	const OPEN_CHAT = io.sockets.adapter.rooms[openChat!.uuid] as any;
	if (!OPEN_CHAT.actives) {
		OPEN_CHAT.actives = [socket.user.uuid];
	} else {
		OPEN_CHAT.actives.push(socket.user.uuid);
	}

	mutateRooms(socket, rooms, 'set');
	mutateUsers(socket, users, 'set');
	mutateActives(socket, null, 'set');
};

export const cleanUp = async () => {};
