import { Box } from '@chakra-ui/layout';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { IRoom, roomActions } from '../../../../store/room';
import RoomEdit from './RoomEdit';
import RoomHeader from './RoomHeader';

interface Room {
	room: IRoom;
}

function Room({ room }: Room) {
	const auth = useAppSelector((state) => state.auth.user);
	const currentRoom = useAppSelector((state) => state.room.current);
	const rooms = useAppSelector((state) => state.room.rooms);
	const dispatch = useAppDispatch();

	const checked = useMemo(
		() => rooms.find(({ uuid }) => uuid === room.uuid)?.checked,
		[room.uuid, rooms]
	);

	const newMsgCondition = useMemo(
		() =>
			// 새 메시지가 생성되었고
			checked &&
			// 현재 참여하고 있는 방이 아니고
			currentRoom !== room.uuid &&
			// 내가 보낸 메시지가 아닐 경우에 새 메시지 알람을 표시한다
			room.messages[room.messages.length - 1].user.uuid !== auth?.uuid,
		[auth?.uuid, checked, currentRoom, room.messages, room.uuid]
	);

	useEffect(() => {
		if (checked && currentRoom === room.uuid) {
			dispatch(roomActions.setMsgChecked(room.uuid));
		}
	}, [checked, currentRoom, dispatch, room.uuid]);

	return (
		<Box
			key={room.uuid}
			position='relative'
			p='3'
			pb='5'
			alignItems='center'
			borderBottom='1px solid'
			borderBottomColor='gray.200'
			cursor='pointer'
			backgroundColor={currentRoom === room.uuid ? 'gray.100' : 'initial'}
			onClick={() => {
				dispatch(roomActions.setCurrentRoom(room.uuid));
				dispatch(roomActions.setMsgChecked(room.uuid));
			}}
			display='flex'
			justifyContent='space-between'
		>
			<RoomHeader room={room} />
			<RoomEdit room={room} newMsg={newMsgCondition} />
		</Box>
	);
}

export default Room;
