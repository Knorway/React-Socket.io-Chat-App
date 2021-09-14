import { MouseEventHandler, useMemo, useState } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { IRoom, roomActions } from '../../../../store/room';
import { AiTwotoneSetting, AiFillDelete } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { HiUsers } from 'react-icons/hi';
import { Avatar } from '@chakra-ui/avatar';

interface Room {
	room: IRoom;
}

function Room({ room }: Room) {
	const [onEdit, setOnEdit] = useState(false);
	const socket = useAppSelector((state) => state.socket.socket);
	const rooms = useAppSelector((state) => state.room.rooms);
	const auth = useAppSelector((state) => state.auth.user);
	const currentRoom = useAppSelector((state) => state.room.current);
	const dispatch = useAppDispatch();

	const participants = useMemo(
		() => room.users.map(({ name }) => name).filter((name) => name !== auth?.name),
		[auth, room.users]
	);

	const removeRoom: MouseEventHandler<HTMLParagraphElement> = (e) => {
		e.stopPropagation();
		socket?.emit('room-remove', currentRoom);

		const openChat = rooms.find((room) => room.label == 'open chat');
		dispatch(roomActions.setCurrentRoom(openChat?.uuid));
	};

	return (
		<Box
			key={room.uuid}
			position='relative'
			p='3'
			alignItems='center'
			borderBottom='1px solid'
			borderBottomColor='gray.200'
			cursor='pointer'
			backgroundColor={currentRoom === room.uuid ? 'gray.100' : 'initial'}
			onClick={(e) => {
				dispatch(roomActions.setCurrentRoom(room.uuid));
			}}
			display='flex'
			justifyContent='space-between'
		>
			<Box display='flex'>
				{room.label !== 'open chat' && (
					<Box>
						<Avatar
							size='xs'
							src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat1&accessoriesType=Prescription01&hatColor=Red&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Dizzy&eyebrowType=SadConcerned&mouthType=Twinkle&skinColor=Light'
							mr='2'
						/>
					</Box>
				)}
				<Box>
					<Text pb='1' display='inline-block'>
						{room.title
							? room.title
							: participants?.length === 1
							? participants?.[0]
							: `${participants?.[0]}님 외 ${participants?.length}명`}

						{participants.length > 2 && (
							<Box display='inline-block' ml='2'>
								<HiUsers
									style={{
										display: 'inline-block',
										color: 'grey',
									}}
									size='13'
								/>
								<Text
									display='inline-block'
									fontSize='xs'
									color='gray'
									ml='1'
								>
									{participants.length}
								</Text>
							</Box>
						)}
					</Text>
				</Box>
			</Box>
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
								const confirm =
									window.confirm('정말 방을 나가시겠습니까?');
								if (confirm) {
									removeRoom(e);
								}
							}}
						>
							방 나가기
						</Text>
					</Box>
					<Box
						display='flex'
						alignItems='center'
						color='#3182ce'
						onClick={() => setOnEdit(false)}
					>
						<IoIosArrowBack />
						<Text pb='2px'>뒤로</Text>
					</Box>
				</Box>
			)}
		</Box>
	);
}

export default Room;
