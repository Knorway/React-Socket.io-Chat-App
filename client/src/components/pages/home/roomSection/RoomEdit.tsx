import { MouseEventHandler, useState } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { AiTwotoneSetting } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { IRoom, roomActions } from '../../../../store/room';

interface RoomEdit {
	room: IRoom;
	checked: boolean | undefined;
}

function RoomEdit({ room, checked }: RoomEdit) {
	const [onEdit, setOnEdit] = useState(false);
	const socket = useAppSelector((state) => state.socket.socket);
	const currentRoom = useAppSelector((state) => state.room.current);
	const rooms = useAppSelector((state) => state.room.rooms);
	const dispatch = useAppDispatch();

	const removeRoom: MouseEventHandler<HTMLParagraphElement> = (e) => {
		e.stopPropagation();
		socket?.emit('room-remove', currentRoom);

		const openChat = rooms.find((room) => room.label == 'open chat');
		dispatch(roomActions.setCurrentRoom(openChat?.uuid));
	};

	return (
		<>
			{room.label !== 'open chat' && (
				<Box justifySelf='end'>
					<AiTwotoneSetting
						style={{
							padding: '4px',
							color: 'lightgray',
							paddingBottom: '8px',
						}}
						onClick={(e) => {
							e.stopPropagation();
							setOnEdit(true);
						}}
						size='26'
					/>
				</Box>
			)}
			{onEdit && (
				<Box
					backgroundColor='white'
					position='absolute'
					top='0'
					left='0'
					w='100%'
					h='100%'
					p='3'
					display='flex'
					justifyContent='space-between'
					alignItems='center'
				>
					<Box display='flex' alignItems='center'>
						<Text
							color='red.600'
							onClick={(e) => {
								e.stopPropagation();
								const confirm =
									window.confirm('정말 방을 나가시겠습니까?');
								if (confirm) {
									removeRoom(e);
									return;
								}
								setOnEdit(false);
							}}
						>
							방 나가기
						</Text>
					</Box>
					<Box
						display='flex'
						alignItems='center'
						color='#3182ce'
						onClick={(e) => {
							e.stopPropagation();
							setOnEdit(false);
						}}
					>
						<IoIosArrowBack />
						<Text pb='2px'>뒤로</Text>
					</Box>
				</Box>
			)}
			<Box
				position='absolute'
				left='11px'
				bottom='4px'
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				w='90%'
			>
				{!onEdit && (
					<Text fontSize='xs' color='grey'>
						{`${room.messages[room.messages.length - 1].user.name}:`}
						<Text as='span' ml='1'>
							{room.messages[room.messages.length - 1].message}
						</Text>
					</Text>
				)}
			</Box>
			{checked && (
				<Box
					w='8px'
					h='8px'
					backgroundColor='green.300'
					borderRadius='50%'
					position='absolute'
					right='21px'
					bottom='10px'
				></Box>
			)}
		</>
	);
}

export default RoomEdit;
