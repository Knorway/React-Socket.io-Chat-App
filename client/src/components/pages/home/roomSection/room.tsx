import { useMemo, useState } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { IRoom, roomActions } from '../../../../store/room';

interface Room {
	room: IRoom;
}

function Room({ room }: Room) {
	// const [onEdit, setOnEdit] = useState(false) | 어떻게 할까 아니면 위에서 할까
	const auth = useAppSelector((state) => state.auth.user);
	const rooms = useAppSelector((state) => state.room.rooms);
	const currentRoom = useAppSelector((state) => state.room.current);
	const dispatch = useAppDispatch();

	const participants = useMemo(
		() => room.users.map(({ name }) => name).filter((name) => name !== auth!.name),
		[auth, room.users]
	);

	return (
		<Box
			key={room.uuid}
			p='3'
			alignItems='center'
			borderBottom='1px solid'
			borderBottomColor='gray.200'
			cursor='pointer'
			backgroundColor={currentRoom === room.uuid ? 'gray.100' : 'initial'}
			onClick={() => {
				dispatch(roomActions.setCurrentRoom(room.uuid));
			}}
		>
			<Box>
				<Text>
					{room.title
						? room.title
						: participants?.length === 1
						? participants?.[0]
						: `${participants?.[0]}님 외 ${participants?.length}명`}
				</Text>
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
	);
}

export default Room;
