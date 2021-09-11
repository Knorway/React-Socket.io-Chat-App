import { io } from '../../app';

type SuffixType = 'set' | 'update' | 'add' | 'remove';
type MutateFunction = (socket: SocketIO.Socket, payload: any, suffix: SuffixType) => void;

export const mutateRooms: MutateFunction = (socket, payload, suffix) => {
	switch (suffix) {
		case 'set':
			socket.emit(`room-${suffix}`, payload);
			return;
		case 'add':
			io.in(payload.uuid).emit(`room-${suffix}`, payload);
			socket.emit(`room-${suffix}/changeCurrentRoom`, payload.uuid);
	}
};

export const mutateUsers: MutateFunction = (socket, users, suffix) => {
	switch (suffix) {
		case 'set':
			socket.emit(`user-${suffix}`, users);
			return;
	}
};

export const mutateMessages: MutateFunction = (socket, payload, suffix) => {
	//
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
