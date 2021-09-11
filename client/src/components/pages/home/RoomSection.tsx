import { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { IRoom, roomActions } from '../../../store/room';

function RoomSection() {
	const rooms = useAppSelector((state) => state.room.rooms);
	const currentRoom = useAppSelector((state) => state.room.current);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!rooms.length || currentRoom) return;

		// 타입 다시
		const defaultRoom = (localStorage.getItem('defaultRoom') ||
			rooms.find((room) => room.label === 'open chat')) as IRoom;

		dispatch(roomActions.setCurrentRoom(defaultRoom.uuid));
	}, [currentRoom, dispatch, rooms]);

	return (
		<Flex
			border='1px solid'
			borderColor='gray.400'
			flex='1'
			flexDir='column'
			justifyContent='space-between'
			minH='20vh'
		>
			<Flex flexDir='column' overflow='auto'>
				{rooms.map((room) => (
					<Box
						key={room.uuid}
						p='3'
						alignItems='center'
						borderBottom='1px solid'
						borderBottomColor='gray.200'
						cursor='pointer'
						backgroundColor={
							currentRoom === room.uuid ? 'gray.100' : 'initial'
						}
						onClick={() => {
							dispatch(roomActions.setCurrentRoom(room.uuid));
						}}
					>
						<Box>
							<Text>{room.title}</Text>
						</Box>
						<Box fontSize='12px'>
							members:{' '}
							{room.users.map((user: any) => (
								<Text as='span' key={user.id} mr='2px'>
									[{user.name}]
								</Text>
							))}
						</Box>
					</Box>
				))}
			</Flex>
			{/* <Flex
				borderTop='1px solid'
				borderTopColor='gray.400'
				borderTopRadius='none'
				as='form'
			>
				<Input
					value={roomName}
					onChange={(e) => setRoomName(e.target.value)}
					placeholder="Let's make more chats!"
					_placeholder={{ fontSize: '13px' }}
					border='none'
					borderRadius='0'
					_focus={{
						boxShadow: '0 0 0 2px #3182ce;',
						zIndex: '1',
					}}
				/>
				<Button
					aria-label='create group button'
					borderRadius='0'
					// onClick={createRoom}
				>
					+
				</Button>
			</Flex> */}
		</Flex>
	);
}

export default RoomSection;
