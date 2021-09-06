import { Box, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { client, REGISTER_URL, VALIDATE_URL } from '../../../api';
import { useAppDispatch } from '../../../store';
import { authActions } from '../../../store/auth';
import { LoginButton, LoginInput } from '../../common/form';

const RegisterPage = () => {
	const [authError, setAuthError] = useState(null);
	const router = useRouter();
	const dispatch = useAppDispatch();

	return (
		<Formik
			initialValues={{
				email: '',
				name: '',
				password: '',
				rePassword: '',
			}}
			validationSchema={yup.object({
				email: yup.string().email('badbad email').required('email req'),
				name: yup.string().required('password req'),
				password: yup.string().required('password req'),
				rePassword: yup.string().test('password-match', function (value) {
					return this.parent.password !== value
						? this.createError({ message: "password don't match" })
						: true;
				}),
			})}
			onSubmit={async (value, helper) => {
				try {
					const { data: token } = await client.post(REGISTER_URL, value);
					localStorage.setItem('token', token);
					const { data: user } = await client.get(VALIDATE_URL, {
						headers: { Authorization: `Bearer ${token}` },
					});

					dispatch(authActions.setUser(user));
					helper.resetForm();
					router.push('/');
				} catch (error) {
					console.log(error);
				}
			}}
		>
			<Flex as={Form} justifyContent='center' alignItems='center' h='100vh'>
				<Box maxW='350px' p='1.5rem' border='1px solid' borderColor='gray.200'>
					<Text textAlign='center' mb='8px' fontWeight='bold'>
						Let's Chat!
					</Text>
					<LoginInput name='email' placeholder='email' />
					<LoginInput name='name' placeholder='name' />
					<LoginInput name='password' placeholder='password' type='password' />
					<LoginInput
						name='rePassword'
						placeholder='confirm your password'
						type='password'
					/>
					<Flex justifyContent='space-between' alignItems='center'>
						<LoginButton type='submit'>register</LoginButton>
						<Text as='p' display='inline-block' fontSize='13px'>
							have an account?{' '}
							<Text
								as='span'
								color='blue.400'
								cursor='pointer'
								onClick={() => router.push('/login')}
							>
								login
							</Text>{' '}
							here
						</Text>
					</Flex>
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

export default RegisterPage;
