import { createSlice } from '@reduxjs/toolkit';

interface RoomState {
	rooms: any[];
	current: string;
	messages: any[];
	lastMessage: string;
	checked: boolean;
}

const initialState: RoomState = {
	rooms: [],
	current: '',
	messages: [],
	lastMessage: '',
	checked: false,
};

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		mutateRooms: (state, { payload }) => {
			switch (payload.meta) {
				case 'set':
					state.rooms = payload.data;
					return;
				case 'add':
					state.rooms.push(payload.data);
					return;
			}
		},
		setCurrentRoom: (state, { payload }) => {
			state.current = payload;
		},
		mutateMessages: (state, { payload }) => {
			switch (payload.meta) {
				case 'add':
					for (const room of state.rooms) {
						if (room.uuid !== payload.data.roomId) continue;
						room.messages.push(payload.data.data);
						return;
					}
			}
		},
	},
});

export const roomActions = roomSlice.actions;
export default roomSlice;
