import { Reducer, useReducer } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../../../store';
import UserInfo from './UserInfo';
import UserList from './UserList';
import { IUser } from '../../../../store/user';

export interface IinitialState {
	toggled: boolean;
	user: IUser | null;
}

const initialState: IinitialState = { toggled: false, user: null };
const reducer: Reducer<IinitialState, IinitialState> = (prev, curr) => ({
	...prev,
	...curr,
});

function UserListSection() {
	const [tabState, tabDispatch] = useReducer(reducer, initialState);
	const users = useAppSelector((state) => state.user.users);

	return (
		<Box
			border='1px solid'
			borderColor='gray.400'
			flex='1'
			minH='20vh'
			overflowY={['auto', 'auto', 'auto', 'initial']}
		>
			{tabState.toggled ? (
				<UserInfo tabDispatch={tabDispatch} userTabUser={tabState.user} />
			) : (
				<UserList users={users} tabDispatch={tabDispatch} />
			)}
		</Box>
	);
}

export default UserListSection;
