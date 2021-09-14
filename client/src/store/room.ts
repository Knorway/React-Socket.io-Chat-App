import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './user';

interface RoomState {
	rooms: IRoom[];
	current: string;
	messages: IMessage[];
}

export interface IRoom {
	[key: string]: any;
	title: string | null;
	label: string;
	uuid: string;
	users: IUser[];
	messages: IMessage[];
	checked?: boolean;
}

export interface IMessage {
	uuid: string;
	message: string;
	createdAt: any;
	user: IUser;
}

const initialState: RoomState = {
	rooms: [],
	current: '',
	messages: [],
};

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		setCurrentRoom: (state, { payload }) => {
			state.current = payload;
		},
		setMsgChecked: (state, { payload }) => {
			state.rooms.forEach((room) => {
				if (room.uuid === payload) {
					room.checked = false;
				}
			});
		},
		mutateRooms: (state, { payload }) => {
			switch (payload.meta) {
				case 'set':
					state.rooms = payload.data;
					return;
				case 'add':
					state.rooms.push(payload.data);
					return;
				case 'remove':
					state.rooms = state.rooms.filter(
						(room) => room.uuid !== payload.data
					);
			}
		},
		mutateMessages: (state, { payload }) => {
			switch (payload.meta) {
				case 'add':
					for (const room of state.rooms) {
						if (room.uuid !== payload.data.roomId) continue;
						room.messages.push(payload.data.data);
						room.checked = true;
						return;
					}
			}
		},
	},
});

export const roomActions = roomSlice.actions;
export default roomSlice;
