import { Box, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../store';

function ChatSection() {
	const [input, setInput] = useState('');
	const socket = useAppSelector((state) => state.socket.socket);
	const currentRoom = useAppSelector((state) => state.room.current);
	const rooms = useAppSelector((state) => state.room.rooms);
	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const thisRoom = useMemo(
		() => rooms.find((room) => room.uuid === currentRoom),
		[currentRoom, rooms]
	);

	const submitChat: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key !== 'Enter' || !socket) return;
		socket.emit('message-add', { roomId: currentRoom, data: input });
		setInput('');
	};

	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.focus();
	}, [currentRoom]);

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
				{thisRoom?.messages?.map((msg: any) => (
					<Box key={msg.uuid}>
						<Text>{msg.message}</Text>
					</Box>
				))}
			</Box>
			<Flex borderTop='1px solid' borderTopColor='gray.400' borderTopRadius='none'>
				<Input
					ref={inputRef}
					placeholder='Enter your message...'
					_placeholder={{ fontSize: '13px' }}
					border='none'
					borderRadius='0'
					_focus={{
						boxShadow: '0 0 0 2px #3182ce;',
						zIndex: '1',
					}}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyPress={submitChat}
				/>
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
