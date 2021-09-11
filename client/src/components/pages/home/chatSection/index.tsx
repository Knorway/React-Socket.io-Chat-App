import { Box, Flex, IconButton } from '@chakra-ui/react';
import { useMemo } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useAppSelector } from '../../../../store';
import Message from './Message';
import MessageInput from './MessageInput';

function ChatSection() {
	const currentRoom = useAppSelector((state) => state.room.current);
	const rooms = useAppSelector((state) => state.room.rooms);

	const thisRoom = useMemo(
		() => rooms.find((room) => room.uuid === currentRoom),
		[currentRoom, rooms]
	);

	return (
		<Flex
			border='1px solid'
			borderColor='gray.400'
			flex='3'
			mx={['0', '0', '0', '8px']}
			my={['8px', '8px', '8px', '0']}
			flexDir='column'
			justifyContent='space-between'
		>
			<Box overflowY='auto'>
				{thisRoom?.messages?.map((msg) => (
					<Message key={msg.uuid} msg={msg} />
				))}
			</Box>
			<Flex borderTop='1px solid' borderTopColor='gray.400' borderTopRadius='none'>
				<MessageInput />
				<IconButton
					icon={<RiSendPlaneFill />}
					aria-label='send button'
					borderRadius='0'
				/>
			</Flex>
		</Flex>
	);
}

export default ChatSection;
