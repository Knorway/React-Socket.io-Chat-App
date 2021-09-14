import React, { memo, useMemo } from 'react';
import { Box, Flex, SpacerProps, Text } from '@chakra-ui/layout';
import {
	BackgroundProps,
	ColorProps,
	FlexboxProps,
	TypographyProps,
} from '@chakra-ui/styled-system';
import { format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { useAppSelector } from '../../../../store';
import { IMessage } from '../../../../store/room';
import { Avatar } from '@chakra-ui/avatar';

interface Message {
	msg: IMessage;
}

function Message({ msg }: Message) {
	const auth = useAppSelector((state) => state.auth.user);

	const writtenByMe = useMemo(() => msg.user.uuid === auth?.uuid, [auth, msg]);
	const setStyleOnWriter = <T,>(others: T, mine: T) => (writtenByMe ? mine : others);

	return (
		<>
			{!writtenByMe && (
				<Text fontSize='xs' pl='1'>
					{msg.user.name}
				</Text>
			)}
			<Flex
				key={msg.uuid}
				display='flex'
				p='1'
				justifyContent={setStyleOnWriter<FlexboxProps['justifyContent']>(
					'flex-start',
					'flex-end'
				)}
				alignItems='center'
			>
				{!writtenByMe && (
					<Box alignSelf='start' mr='2'>
						<Avatar
							size='sm'
							src='https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat1&accessoriesType=Prescription01&hatColor=Red&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Dizzy&eyebrowType=SadConcerned&mouthType=Twinkle&skinColor=Light'
						/>
					</Box>
				)}
				<Box marginBottom='2' maxW='300px' overflow='hidden'>
					<Box
						px='2'
						py='3'
						backgroundColor={setStyleOnWriter<
							BackgroundProps['backgroundColor']
						>('gray.200', '#4dabf7')}
						color={setStyleOnWriter<ColorProps['color']>('black', 'white')}
						borderRadius='md'
						maxW='max-content'
						marginLeft={setStyleOnWriter<SpacerProps['marginLeft']>(
							'initial',
							'auto'
						)}
						mb='1'
					>
						<Text fontSize='15px'>{msg.message}</Text>
					</Box>
					<Box>
						<Text
							fontSize='9px'
							color='gray.500'
							textAlign={setStyleOnWriter<TypographyProps['textAlign']>(
								'left',
								'right'
							)}
						>
							{format(new Date(msg.createdAt), 'PPP HH:mm', {
								locale: ko,
							})}
						</Text>
					</Box>
				</Box>
			</Flex>
		</>
	);
}

export default memo(Message);
