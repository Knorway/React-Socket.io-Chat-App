import { useRouter } from 'next/router';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInitializeSocket } from '../../../hooks/useInitializeSocket';
import { useAuth } from '../../../hooks/useAuth';
import ChatSection from './ChatSection';
import RoomSection from './RoomSection';
import UserListSection from './UserListSection';
import { useAppSelector } from '../../../store';

function HomePage() {
	useInitializeSocket();
	const socket = useAppSelector((state) => state.socket.socket);
	const allSockets = useAppSelector((state) => state.socket.allSockets);
	const { user, isValidating } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user && !isValidating) router.push('/login');
	}, [isValidating, router, user]);

	if (!socket) return null;
	if (!user) return null;

	return (
		<Box>
			<Text
				as='h1'
				fontSize='3xl'
				fontWeight='extrabold'
				color='black'
				textAlign='center'
			>
				{`Active Sockets: ${allSockets}`}
			</Text>
			<Flex
				w={['90%', '90%', '90%', '100%', '82%']}
				h='90vh'
				m='1rem auto'
				px='1rem'
				flexDir={['column', 'column', 'column', 'row']}
			>
				<RoomSection />
				<ChatSection />
				<UserListSection />
			</Flex>
		</Box>
	);
}

export default HomePage;
