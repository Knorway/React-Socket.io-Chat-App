import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import roomSlice from './room';
import socketSlice from './socket';
import authSlice from './auth';
import userSlice from './user';

const combinedReducer = combineReducers({
	socket: socketSlice.reducer,
	auth: authSlice.reducer,
	room: roomSlice.reducer,
	user: userSlice.reducer,
});

const rootReducer: Reducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.type;
		default:
			return combinedReducer(state, action);
	}
};

const createStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }),
		devTools: process.env.NODE_ENV !== 'production',
	});
	return store;
};

const wrapper = createWrapper(createStore, {
	debug: process.env.NODE_ENV !== 'production',
});

const store = createStore();
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default wrapper;
