import { Input } from '@chakra-ui/input';
import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../store';

function MessageInput() {
	const [input, setInput] = useState('');
	const socket = useAppSelector((state) => state.socket.socket);
	const currentRoom = useAppSelector((state) => state.room.current);
	const inputRef = useRef<HTMLInputElement>(null);

	const submitChat: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key !== 'Enter' || !socket || !input) return;
		socket.emit('message-add', { roomId: currentRoom, data: input });
		setInput('');
	};

	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.focus();
	}, [currentRoom]);

	return (
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
	);
}

export default MessageInput;
