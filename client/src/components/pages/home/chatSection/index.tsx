import { Flex, IconButton } from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

function ChatSection() {
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
			<MessageList />
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
