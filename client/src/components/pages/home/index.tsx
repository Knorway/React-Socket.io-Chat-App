import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/react';
import { useAuth } from '../../../hooks/useAuth';
import { useInitializeSocket } from '../../../hooks/useInitializeSocket';
import { useAppSelector } from '../../../store';
import ChatSection from './ChatSection';
import DebugInfo from './DebugInfo';
import RoomSection from './RoomSection';
import UserListSection from './userListSection';

function HomePage() {
	useInitializeSocket();
	const socket = useAppSelector((state) => state.socket.socket);
	const { user, isValidating } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user && !isValidating) router.push('/login');
	}, [isValidating, router, user]);

	if (!socket) return null;
	if (!user) return null;

	return (
		<Box>
			<DebugInfo />
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
