import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { BsFillChatFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';

interface IUserInfo {
	toggledUser: any;
	toggleUser: (toggle: boolean, user?: any) => void;
}

function UserInfo({ toggleUser, toggledUser: user }: IUserInfo) {
	if (!user) return null;

	return (
		<Box h='90%'>
			<Box
				onClick={() => toggleUser(false, null)}
				cursor='pointer'
				p='3'
				display='flex'
				alignItems='center'
				borderBottom='1px solid'
				borderBottomColor='gray.300'
				mb={['8', '8', '8', '0']}
			>
				<IoIosArrowBack style={{ display: 'inline' }} />
				<Text display='inline-block' ml='5px' fontSize='15px' color='blue.500'>
					전체 유저
				</Text>
			</Box>
			<Flex
				flexDir='column'
				alignItems='center'
				justifyContent='center'
				maxH='100%'
				h='100%'
			>
				<Avatar
					src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtVNeck&clotheColor=Blue01&eyeType=Hearts&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Yellow'
					size='xl'
					backgroundColor='transparent'
					mb='4'
				></Avatar>
				<Text mb='4'>{user.name}</Text>
				<Box>
					<IconButton
						aria-label='chat-button'
						icon={<BsFillChatFill />}
						borderRadius='50%'
						// 여기서 정보 보내서 방 생성하고 후속조치 하면 된다
						onClick={() => {}}
					/>
				</Box>
			</Flex>
		</Box>
	);
}

export default UserInfo;
