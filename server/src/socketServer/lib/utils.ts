import { io } from '../../app';

export const GET_OPEN_CHAT = (socket: SocketIO.Socket): SocketIO.Room | undefined => {
	const openChat = socket.user.getOpenChat();
	const openChatId = openChat?.uuid as string;
	const OPEN_CHAT = io.sockets.adapter.rooms[openChatId];
	return OPEN_CHAT;
};
