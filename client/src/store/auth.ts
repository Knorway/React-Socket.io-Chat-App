import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	user: User | null;
	isValidating: boolean;
}

interface User {
	id: number;
	email: string;
	uuid: string;
	name: string;
}

const initialState: AuthState = {
	user: null,
	isValidating: true,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
		setIsValidating: (state, { payload }) => {
			state.isValidating = payload;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice;
