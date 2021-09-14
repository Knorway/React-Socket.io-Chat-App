import { useEffect, useMemo, useRef } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useAppSelector } from '../../../../store';
import Message from './Message';
import MessageInput from './MessageInput';

function ChatSection() {
	const currentRoom = useAppSelector((state) => state.room.current);
	const rooms = useAppSelector((state) => state.room.rooms);
	const chatRef = useRef<HTMLDivElement>(null);

	const thisRoom = useMemo(
		() => rooms.find((room) => room.uuid === currentRoom),
		[currentRoom, rooms]
	);
	const msgLength = useMemo(
		() => rooms.find(({ uuid }) => uuid === currentRoom)?.messages.length,
		[currentRoom, rooms]
	);

	useEffect(() => {
		if (!chatRef.current) return;
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}, [currentRoom, msgLength]);

	return (
		<Flex
			border='1px solid'
			borderColor='gray.400'
			flex='3'
			mx={['0', '0', '0', '8px']}
			my={['8px', '8px', '8px', '0']}
			flexDir='column'
			justifyContent='space-between'
			h='100%'
		>
			<Box ref={chatRef} overflow='auto'>
				{thisRoom?.messages?.map((msg) => (
					<Message msg={msg} key={msg.uuid} />
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
