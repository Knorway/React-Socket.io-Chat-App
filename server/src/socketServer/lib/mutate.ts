import { io } from '../../app';
import { User } from '../../entity/User';
import { GET_OPEN_CHAT } from './utils';

type SuffixType = 'set' | 'update' | 'add' | 'remove';
type MutateFunction = (socket: SocketIO.Socket, payload: any, suffix: SuffixType) => void;

export const mutateRooms: MutateFunction = (socket, payload, suffix) => {
	switch (suffix) {
		case 'set':
			socket.emit(`room-${suffix}`, payload);
			return;
		case 'add':
			io.in(payload.uuid).emit(`room-${suffix}`, payload);
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
	switch (suffix) {
		case 'set':
			io.emit(`active-${suffix}`, payload);
			return;
	}
};

export const mutateSocketId: MutateFunction = async (socket, payload, suffix) => {
	switch (suffix) {
		case 'update': {
			io.emit(`socketId-${suffix}`, {
				userId: socket.user.uuid,
				socketId: socket.id,
			});
		}
	}
};

export const initialize = async (socket: SocketIO.Socket) => {
	const rooms = await User.getAllRoomsOf(socket.user.id);
	const users = await User.find({});

	if (!rooms) {
		throw new Error('socket initialization error. no rooms found for the user.');
	}

	rooms.forEach((room) => socket.join(room.uuid));

	const OPEN_CHAT = GET_OPEN_CHAT(socket);
	if (!OPEN_CHAT) return;

	// if (!OPEN_CHAT.actives) {
	// 	OPEN_CHAT.actives = [socket.user.uuid];
	// } else {
	// 	OPEN_CHAT.actives.push(socket.user.uuid);
	// }

	if (!OPEN_CHAT.actives) {
		OPEN_CHAT.actives = [{ socketId: socket.id, userId: socket.user.uuid }];
	} else {
		OPEN_CHAT.actives.push({ socketId: socket.id, userId: socket.user.uuid });
	}

	mutateRooms(socket, rooms, 'set');
	mutateUsers(socket, users, 'set');
	mutateActives(socket, OPEN_CHAT.actives, 'set');
	// 여전히 뒤에 애는 모른다. actives에 전부 다 넣어야겠다. 그러면 프론트 스토어 업데이트도 수정해야 되고
	// 전부다 actives 스토에어 관리할까. undefined나오면 어차피 나중에 연결될 때 업데이트 될테니까
	// 일단 OPEN_CHAT.actives에 uuid넣고 이걸 받은 프론트에서 필터링 다시 하고
	// 이걸 기준으로 프론트에서는 해당하는 socketId를 보내주는 걸로 하자
	mutateSocketId(socket, null, 'update');
};

export const cleanUp = async () => {};

interface Result {
	name: string;
}
