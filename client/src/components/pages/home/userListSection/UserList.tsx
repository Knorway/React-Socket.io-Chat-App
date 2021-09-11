import { Avatar, AvatarBadge } from '@chakra-ui/avatar';
import { Box, Flex } from '@chakra-ui/layout';
import { Dispatch, Fragment } from 'react';
import { initialState } from '.';
import { useAppSelector } from '../../../../store';
import { IUser } from '../../../../store/user';

interface UserList {
	users: IUser[];
	tabDispatch: Dispatch<initialState>;
}

function UserList({ users, tabDispatch }: UserList) {
	const actives = useAppSelector((state) => state.user.actives);

	if (!users.length || !actives) return null;

	return (
		<>
			{users.map((user) => (
				<Fragment key={user.uuid}>
					<Flex flexDir='column'>
						<Flex
							p='3'
							alignItems='center'
							borderBottom='1px solid'
							borderBottomColor='gray.200'
							onClick={() => tabDispatch({ toggled: true, user })}
						>
							<Avatar
								src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtVNeck&clotheColor=Blue01&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Yellow'
								size='sm'
								backgroundColor='transparent'
							>
								<AvatarBadge
									bg={
										actives.find(({ userId }) => userId === user.uuid)
											? 'green.400'
											: 'red.400'
									}
									boxSize='3'
								/>
							</Avatar>
							<Box ml='3'>{user.name}</Box>
						</Flex>
					</Flex>
					<Box></Box>
				</Fragment>
			))}
		</>
	);
}

export default UserList;
