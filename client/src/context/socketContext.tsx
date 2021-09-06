import io from 'socket.io-client';
import { createContext, useEffect, useReducer, useState } from 'react';

export const SocketContext = createContext<any>(null);

const initialState = [
	{ user: 'admin', message: '[default system message] Welcome to the chat!' },
];

const reducer = (state: any, action: any) => {
	switch (action.type) {
		case 'add':
			return [...state, action.payload];
	}
};

export default function SocketContextProvider(props: any) {
	const [socket, setSocket] = useState<any>(null);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const ws = io('ws://localhost:5000', { transports: ['websocket'] });
		setSocket(ws);

		ws.on('reconnect', () => {
			setSocket(ws);
		});

		ws.on('disconnect', () => {
			setSocket(null);
		});

		// ws.on('chat-submit-echo', (data) => {
		// 	dispatch({
		// 		type: 'add',
		// 		payload: data,
		// 	});
		// });

		return () => {
			ws.close();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, state, dispatch }}>
			{props.children}
		</SocketContext.Provider>
	);
}
