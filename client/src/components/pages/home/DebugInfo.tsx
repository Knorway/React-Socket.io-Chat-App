import { HStack, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../store';

function DebugInfo() {
	const socket = useAppSelector((state) => state.socket.socket);
	const actives = useAppSelector((state) => state.user.actives);

	return (
		<HStack justifyContent='center'>
			<Text
				as='h1'
				fontSize='2xl'
				fontWeight='extrabold'
				color='black'
				textAlign='center'
				display='inline-block'
			>
				{`Active users: ${new Set(actives.map(({ userId }) => userId)).size}`}
			</Text>
			<Text
				as='h1'
				fontSize='2xl'
				fontWeight='extrabold'
				color='black'
				textAlign='center'
				display='inline-block'
			>
				{`Active Sockets: ${actives.length}`}
			</Text>
			<Text
				as='h1'
				fontSize='2xl'
				fontWeight='extrabold'
				color='black'
				textAlign='center'
				display='inline-block'
			>
				{`current Socket.id: ${socket?.id}`}
			</Text>
		</HStack>
	);
}

export default DebugInfo;
