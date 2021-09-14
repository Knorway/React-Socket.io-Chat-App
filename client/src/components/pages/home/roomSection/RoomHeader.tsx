import { Avatar } from '@chakra-ui/avatar';
import { Box, Text } from '@chakra-ui/layout';
import { useMemo } from 'react';
import { HiUsers } from 'react-icons/hi';
import { useAppSelector } from '../../../../store';
import { IRoom } from '../../../../store/room';

interface RoomHeader {
	room: IRoom;
}

function RoomHeader({ room }: RoomHeader) {
	const auth = useAppSelector((state) => state.auth.user);

	const participants = useMemo(
		() => room.users.map(({ name }) => name).filter((name) => name !== auth?.name),
		[auth, room.users]
	);

	return (
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
				<Box pb='1' display='inline-block'>
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
				</Box>
			</Box>
		</Box>
	);
}

export default RoomHeader;
