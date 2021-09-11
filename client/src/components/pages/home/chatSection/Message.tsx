import { Box, Text } from '@chakra-ui/layout';
import { memo } from 'react';
import { IMessage } from '../../../../store/room';

interface Message {
	msg: IMessage;
}

function Message({ msg }: Message) {
	return (
		<Box key={msg.uuid}>
			<Text>{msg.message}</Text>
		</Box>
	);
}

export default memo(Message);
