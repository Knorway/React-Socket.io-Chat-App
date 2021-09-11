import { jwtAuth } from './lib/middlewares';
import { connectionHandler, messageHandler, roomHandler } from './handlers';

export const socketServer = (io: SocketIO.Server) => {
	io.use(jwtAuth);

	io.on('connection', async (socket) => {
		connectionHandler.initialize(socket);

		socket.on('disconnect', connectionHandler.disconnect(socket));
		socket.on('error', connectionHandler.error());

		socket.on('message-add', messageHandler.add(socket));
		socket.on('room-add', roomHandler.add(socket));
	});
};
