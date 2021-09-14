import { io } from '../../app';
import { Room } from '../../entity/Room';

type SuffixType = 'set' | 'update' | 'add' | 'remove';
type MutateFunction = (socket: SocketIO.Socket, payload: any, suffix: SuffixType) => void;

export const mutateRooms: MutateFunction = (socket, payload, suffix) => {
	switch (suffix) {
		case 'set':
			socket.emit(`room-${suffix}`, payload);
			return;
		case 'add':
			io.in(payload.uuid).emit(`room-${suffix}`, payload);
			socket.emit(`room-${suffix}/afterEffect-socket`, payload.uuid);
			return;
		case 'remove': {
			io.in(payload).emit(`room-${suffix}`, payload);
			return;
		}
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
	switch (suffix) {
		case 'add':
			io.in(payload.roomId).emit(`message-${suffix}`, {
				roomId: payload.roomId,
				data: payload.data,
			});
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
			return;
		}
	}
};
