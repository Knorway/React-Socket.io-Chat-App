import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
	socket: SocketIOClient.Socket | null;
}

const initialState: SocketState = {
	socket: null,
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setSocket: (state, { payload }) => {
			state.socket = payload;
		},
	},
});

export const socketActions = socketSlice.actions;
export default socketSlice;
