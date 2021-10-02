import { useEffect, useMemo } from 'react';
import { Box } from '@chakra-ui/layout';
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

	const fresh = useMemo(
		() => rooms.find(({ uuid }) => uuid === room.uuid)?.fresh,
		[room.uuid, rooms]
	);

	const newMsgCondition = useMemo(
		() =>
			// 새 메시지가 생성되었고
			fresh &&
			// 현재 참여하고 있는 방이 아니고
			currentRoom !== room.uuid &&
			// 내가 보낸 메시지가 아닐 경우에 새 메시지 알람을 표시한다
			room.messages[room.messages.length - 1].user.uuid !== auth?.uuid,
		[auth?.uuid, fresh, currentRoom, room.messages, room.uuid]
	);

	// [main 56f1682] fix: 다른 방에 진입했을 시 참여하고 있던 방의 새 메시지 알림이 뜨던 버그 수정
	useEffect(() => {
		if (fresh && currentRoom === room.uuid) {
			dispatch(roomActions.setMsgChecked(room.uuid));
		}
	}, [fresh, currentRoom, dispatch, room.uuid]);

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
