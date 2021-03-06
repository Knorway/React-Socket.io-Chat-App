import { useEffect } from 'react';
import io from 'socket.io-client';
import { API_URL } from '../api';
import { useAppDispatch } from '../store';
import { roomActions } from '../store/room';
import { socketActions } from '../store/socket';
import { userActions } from '../store/user';

export function useInitializeSocket() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const socket = io(`${API_URL}`, {
			transports: ['websocket'],
			query: { token: localStorage.getItem('token') },
		});

		// PRESERVED EVENTS
		socket.on('connect', () => {
			dispatch(socketActions.setSocket(socket));
		});

		socket.on('disconnect', () => {
			dispatch(socketActions.setSocket(null));
		});

		socket.on('reconnect', () => {
			dispatch(socketActions.setSocket(socket));
		});

		socket.on('error', (error: any) => {
			console.log(error, 'socket.on error');
		});

		// ROOM
		socket.on('room-set', (data: any) => {
			dispatch(roomActions.mutateRooms({ data, meta: 'set' }));
		});

		socket.on('room-add', (data: any) => {
			dispatch(roomActions.mutateRooms({ data, meta: 'add' }));
		});

		socket.on('room-add/afterEffect-socket', (data: any) => {
			dispatch(roomActions.setCurrentRoom(data));
		});

		socket.on('room-remove', (data: any) => {
			dispatch(roomActions.mutateRooms({ data, meta: 'remove' }));
		});

		// USER
		socket.on('user-set', (data: any) => {
			dispatch(userActions.mutateUser({ data, meta: 'set' }));
		});

		// SOCKETID
		socket.on('socketId-update', (data: any) => {
			dispatch(userActions.mutateSocketId({ data, meta: 'update' }));
		});

		// MESSAGE
		socket.on('message-add', (data: any) => {
			dispatch(roomActions.mutateMessages({ data, meta: 'add' }));
		});

		// ACTIVE
		socket.on('active-set', (data: any) => {
			dispatch(userActions.mutateActives({ data, meta: 'set' }));
		});

		socket.on('active-update', (data: any) => {
			dispatch(userActions.mutateActives({ data, meta: 'update' }));
		});

		return () => {
			socket.close();
		};
	}, [dispatch]);
}
