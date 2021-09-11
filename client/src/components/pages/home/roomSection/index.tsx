import { useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { IRoom, roomActions } from '../../../../store/room';
import Room from './room';

function RoomSection() {
	const rooms = useAppSelector((state) => state.room.rooms);
	const currentRoom = useAppSelector((state) => state.room.current);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!rooms.length || currentRoom) return;

		// JSON.parse typescript
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
					<Room key={room.uuid} room={room} />
				))}
			</Flex>
		</Flex>
	);
}

export default RoomSection;
