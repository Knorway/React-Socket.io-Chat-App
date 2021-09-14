import { connectionHandler, messageHandler, roomHandler } from './handlers';
import { jwtAuth } from './lib/middlewares';

export const socketServer = (io: SocketIO.Server) => {
	io.use(jwtAuth);

	io.on('connection', async (socket) => {
		connectionHandler.initialize(socket);

		socket.on('disconnect', connectionHandler.disconnect(socket));
		socket.on('error', connectionHandler.error());

		socket.on('room-add', roomHandler.add(socket));
		socket.on('room-remove', roomHandler.remove(socket));

		socket.on('message-add', messageHandler.add(socket));
	});
};
