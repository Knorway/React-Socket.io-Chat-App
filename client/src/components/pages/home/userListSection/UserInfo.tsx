import { Dispatch } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { BsFillChatFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { initialState } from '.';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { roomActions } from '../../../../store/room';
import { IUser } from '../../../../store/user';

interface UserInfo {
	userTabUser: IUser | null;
	tabDispatch: Dispatch<initialState>;
}

function UserInfo({ tabDispatch, userTabUser: user }: UserInfo) {
	const socket = useAppSelector((state) => state.socket.socket);
	const rooms = useAppSelector((state) => state.room.rooms);
	const actives = useAppSelector((state) => state.user.actives);
	const me = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();

	const createRoom = () => {
		const roomExists = rooms.find(({ users }) => {
			if (users.length !== 2) return false;
			return users.every(({ uuid }) => uuid === me?.uuid || uuid === user?.uuid);
		});

		if (roomExists) {
			dispatch(roomActions.setCurrentRoom(roomExists.uuid));
			return;
		}

		const socketIds = actives
			.filter(({ userId }) => userId === me?.uuid || userId === user?.uuid)
			.map(({ socketId }) => socketId);

		socket?.emit('room-add', { userIds: [me?.uuid, user?.uuid], socketIds });
	};

	if (!user) return null;

	return (
		<Box maxH='90%' h='100%'>
			<Box
				onClick={() => tabDispatch({ toggled: false, user: null })}
				cursor='pointer'
				p='3'
				display='flex'
				alignItems='center'
				borderBottom='1px solid'
				borderBottomColor='gray.300'
				mb={['8', '8', '8', '0']}
			>
				<IoIosArrowBack style={{ display: 'inline' }} color='#3182ce' />
				<Text
					display='inline-block'
					ml='5px'
					fontSize='15px'
					color='blue.500'
					pb='0.5'
				>
					전체 유저
				</Text>
			</Box>
			<Flex
				flexDir='column'
				alignItems='center'
				justifyContent='center'
				maxH='100%'
				h='100%'
			>
				<Avatar
					src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtVNeck&clotheColor=Blue01&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Yellow'
					size='xl'
					backgroundColor='transparent'
					mb='4'
				></Avatar>
				<Text mb='4'>{user.name}</Text>
				<Box>
					{user.uuid !== me?.uuid ? (
						<IconButton
							aria-label='chat-button'
							icon={<BsFillChatFill />}
							borderRadius='50%'
							onClick={createRoom}
						/>
					) : (
						<Button>프로필 편집</Button>
					)}
				</Box>
			</Flex>
		</Box>
	);
}

export default UserInfo;
