import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
	'user-set': boolean;
	'room-set': boolean;
	'room-add': boolean;
	'room-add/afterEffect-socket': boolean;
	'room-remove': boolean;
	'message-add': boolean;
	'active-set': boolean;
	'active-update': boolean;
	'socketId-update': boolean;
}

const initialState: LoadingState = {
	'user-set': false,
	'room-set': false,
	'room-add': false,
	'room-add/afterEffect-socket': false,
	'room-remove': false,
	'message-add': false,
	'active-set': false,
	'active-update': false,
	'socketId-update': false,
};

const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setLoading: (state, { payload }) => {
			state[payload.meta as keyof LoadingState] = payload.state;
		},
	},
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice;
