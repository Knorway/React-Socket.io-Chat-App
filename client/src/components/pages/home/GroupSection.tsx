import { Box, Button, Flex, Input } from '@chakra-ui/react';

function GroupSection() {
	return (
		<Flex
			border='1px solid'
			borderColor='gray.400'
			flex='1'
			flexDir='column'
			justifyContent='space-between'
			minH='20vh'
		>
			<Box>{/* Group */}</Box>
			<Flex borderTop='1px solid' borderTopColor='gray.400' borderTopRadius='none'>
				<Input
					placeholder="Let's make more chats!"
					_placeholder={{ fontSize: '13px' }}
					border='none'
					borderRadius='0'
					_focus={{
						boxShadow: '0 0 0 2px #3182ce;',
						zIndex: '1',
					}}
				/>
				<Button aria-label='create group button' borderRadius='0'>
					+
				</Button>
			</Flex>
		</Flex>
	);
}

export default GroupSection;
