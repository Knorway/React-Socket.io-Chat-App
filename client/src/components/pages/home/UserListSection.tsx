import { Avatar, AvatarBadge, Box, Flex } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useAppSelector } from '../../../store';

function UserListSection() {
	const users = useAppSelector((state) => state.user.users);
	const actives = useAppSelector((state) => state.user.actives);
	console.log(users);
	console.log(actives);

	if (!users.length || !actives) return null;

	return (
		<Box
			border='1px solid'
			borderColor='gray.400'
			flex='1'
			minH='20vh'
			overflowY='auto'
		>
			{users.map((user: any) => (
				<Fragment key={user.uuid}>
					<Flex flexDir='column'>
						<Flex
							p='3'
							alignItems='center'
							borderBottom='1px solid'
							borderBottomColor='gray.200'
						>
							<Avatar
								src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtVNeck&clotheColor=Blue01&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Yellow'
								size='sm'
								backgroundColor='transparent'
							>
								<AvatarBadge
									bg={
										actives.indexOf(user.uuid) !== -1
											? 'green.400'
											: 'red.400'
									}
									boxSize='3'
								/>
							</Avatar>
							<Box ml='3'>{user.name}</Box>
						</Flex>
					</Flex>
				</Fragment>
			))}
		</Box>
	);
}

export default UserListSection;
