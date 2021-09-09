import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../../../store';
import UserInfo from './UserInfo';
import UserList from './UserList';

function UserListSection() {
	const [tabToggled, setTabToggled] = useState(false);
	const [toggledUser, setToggledUser] = useState(null);
	const users = useAppSelector((state) => state.user.users);

	const handleToggleUser = (toggle: boolean, user?: any) => {
		setTabToggled(toggle);
		setToggledUser(user);
	};

	return (
		<Box
			border='1px solid'
			borderColor='gray.400'
			flex='1'
			minH='20vh'
			overflowY={['auto', 'auto', 'auto', 'initial']}
		>
			{tabToggled ? (
				<UserInfo toggleUser={handleToggleUser} toggledUser={toggledUser} />
			) : (
				<UserList users={users} toggleUser={handleToggleUser} />
			)}
		</Box>
	);
}

export default UserListSection;
