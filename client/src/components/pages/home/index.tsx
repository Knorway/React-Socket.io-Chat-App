import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import ChatSection from './ChatSection';
import GroupSection from './GroupSection';
import UserListSection from './UserListSection';

function HomePage() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const ws = socketIO('http://localhost:4000', { transports: ['websocket'] });

		ws.on('connect', () => {
			console.log(ws.id);
		});

		return () => {
			ws.close();
		};
	}, []);

	return (
		<Box>
			<Text
				as='h1'
				fontSize='3xl'
				fontWeight='extrabold'
				color='black'
				textAlign='center'
			>
				Active Sockets: {count}
			</Text>
			<Flex
				w={['90%', '90%', '90%', '100%', '82%']}
				h='90vh'
				m='1rem auto'
				px='1rem'
				flexDir={['column', 'column', 'column', 'row']}
			>
				<GroupSection />
				<ChatSection />
				<UserListSection />
			</Flex>
		</Box>
	);
}

export default HomePage;
