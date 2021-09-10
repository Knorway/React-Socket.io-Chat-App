import { createSlice } from '@reduxjs/toolkit';

interface UserState {
	users: any[];
	actives: any[];
}

const initialState: UserState = {
	users: [],
	actives: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		mutateUser: (state, { payload }) => {
			switch (payload.meta) {
				case 'set':
					state.users = payload.data;
			}
		},
		mutateActives: (state, { payload }) => {
			switch (payload.meta) {
				case 'set':
				case 'update':
					state.actives = payload.data;
					return;
			}
		},
		mutateSocketId: (state, { payload }) => {
			switch (payload.meta) {
				case 'update':
					state.users.forEach((user) => {
						if (user.uuid !== payload.data.userId) return;
						user.socketId = payload.data.socketId;
					});
			}
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice;
