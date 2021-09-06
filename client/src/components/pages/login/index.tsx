import { Box, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { client, LOGIN_URL, VALIDATE_URL } from '../../../api';
import { useAppDispatch } from '../../../store';
import { authActions } from '../../../store/auth';
import { LoginButton, LoginInput } from '../../common/form';

const LoginPage = () => {
	const [authError, setAuthError] = useState(null);
	const [authLoading, setAuthLoading] = useState(false);
	const router = useRouter();
	const dispatch = useAppDispatch();

	// login, register 페이지 validation이랑 오류처리 안하고 넘어감

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={yup.object({
				email: yup.string().required('email req'),
				password: yup.string().required('password req'),
			})}
			onSubmit={async (value, helper) => {
				try {
					setAuthLoading(true);
					const { data: token } = await client.post(LOGIN_URL, value);
					localStorage.setItem('token', token);
					const { data: user } = await client.get(VALIDATE_URL, {
						headers: { Authorization: `Bearer ${token}` },
					});

					dispatch(authActions.setUser(user));
					router.push('/');
				} catch (error) {
					console.log(error.response.data.message);
				} finally {
					setAuthLoading(false);
				}
			}}
		>
			<Flex as={Form} justifyContent='center' alignItems='center' h='100vh'>
				<Box maxW='350px' p='1.5rem' border='1px solid' borderColor='gray.200'>
					<Text textAlign='center' mb='8px' fontWeight='bold'>
						Let's Chat!
					</Text>
					<>
						<LoginInput name='email' placeholder='email' type='email' />
						<LoginInput
							name='password'
							placeholder='password'
							type='password'
						/>
						<Flex justifyContent='space-between' alignItems='center'>
							<LoginButton type='submit' isLoading={authLoading}>
								Login
							</LoginButton>
							<Text as='p' display='inline-block' fontSize='13px'>
								not a member yet?{' '}
								<Text
									as='span'
									color='blue.400'
									cursor='pointer'
									onClick={() => router.push('/register')}
								>
									register
								</Text>{' '}
								now
							</Text>
						</Flex>
					</>
					{authError && (
						<Text as='small' color='tomato' fontSize='12px'>
							올바르지 않은 이메일 혹은 비밀번호입니다.
						</Text>
					)}
				</Box>
			</Flex>
		</Formik>
	);
};

export default LoginPage;
