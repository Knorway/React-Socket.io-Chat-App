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
			state.users = payload.users;
		},
		mutateActives: (state, { payload }) => {
			switch (payload.meta) {
				case 'set':
				case 'update':
					state.actives = payload.data;
					return;
			}
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice;
