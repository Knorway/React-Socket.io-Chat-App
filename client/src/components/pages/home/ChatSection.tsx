import { Box, Button, Flex, IconButton, Input } from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri';

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
		>
			<Box>{/* Chat */}</Box>
			<Flex borderTop='1px solid' borderTopColor='gray.400' borderTopRadius='none'>
				<Input
					placeholder='Enter your message...'
					_placeholder={{ fontSize: '13px' }}
					border='none'
					borderRadius='0'
					_focus={{
						boxShadow: '0 0 0 2px #3182ce;',
						zIndex: '1',
					}}
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
