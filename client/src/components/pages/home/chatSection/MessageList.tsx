import { useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@chakra-ui/layout';
import throttle from 'lodash.throttle';
import { useAppSelector } from '../../../../store';
import Message from './Message';

function MessageList() {
	// const [loading, setLoading] = useState(false);
	const socket = useAppSelector((state) => state.socket.socket);

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

	const shouldLoadmore = useMemo(() => true, []);

	useEffect(() => {
		if (!chatRef.current) return;
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}, [currentRoom, msgLength]);

	useEffect(() => {
		if (!chatRef.current || !shouldLoadmore || !currentRoom) return;
		const loadMore = throttle((e: Event) => {
			if (chatRef.current?.scrollTop! < 200) {
				socket?.emit(
					'message-test',
					rooms.find((room) => room.uuid === currentRoom)?.messages.at(-1)
				);
			}
		}, 1000);

		chatRef.current?.addEventListener('scroll', loadMore);
	}, [currentRoom, rooms, shouldLoadmore, socket]);

	return (
		<Box ref={chatRef} overflow='auto'>
			{thisRoom?.messages?.map((msg) => (
				<Message msg={msg} key={msg.uuid} />
			))}
		</Box>
	);
}

export default MessageList;
