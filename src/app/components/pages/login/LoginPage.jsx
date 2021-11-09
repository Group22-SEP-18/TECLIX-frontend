import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link as ReachLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	Button,
	IconButton,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Link,
	Flex,
	InputGroup,
	InputRightElement,
	FormErrorMessage,
} from '@chakra-ui/react';
import { ArrowForwardIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
	loginPending,
	loginSuccess,
	loginFail,
} from '../../../redux/slices/loginSlice';
import { getUserSuccess } from '../../../redux/slices/userSlice';
import { userLogin } from '../../../../api/userApi';

const LoginPage = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	let location = useLocation();
	const [passwordShow, setPasswordShow] = useState(false);
	const { isLoading, isAuth, error } = useSelector((state) => state.login);
	let { from } = location.state || { from: { pathname: '/' } };
	useEffect(() => {
		sessionStorage.getItem('accessJWT') && history.replace(from);
	}, [history, isAuth, from]);
	const handlePasswordShow = () => setPasswordShow(!passwordShow);
	return (
		<Flex minHeight='100vh' minW='100vw' align='center' justify='center'>
			<Box
				px={8}
				py={4}
				maxWidth='600px'
				borderRadius={10}
				width='full'
				bg='transparent'
			>
				<Box textAlign='center'>
					<Heading>Sign in to Your Account</Heading>
					<Link as={ReachLink} to='/register' my={8} textColor='blue'>
						Create an account
					</Link>
				</Box>

				<Box my={8} textAlign='center'>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={Yup.object({
							email: Yup.string()
								.max(100)
								.email('Invalid email')
								.required('Email cannot be empty'),
							password: Yup.string().required('Password cannot be empty'),
						})}
						onSubmit={async (values) => {
							dispatch(loginPending());
							try {
								const isAuth = await userLogin(values);

								if (isAuth.status === 'error') {
									return dispatch(loginFail(isAuth.message));
								}

								dispatch(loginSuccess(isAuth));
								dispatch(getUserSuccess(isAuth));
								history.push('/');
							} catch (error) {
								const errmsg =
									error.message === 'Request failed with status code 401'
										? 'Invalid Email Or Password'
										: 'Internal Server Error';
								dispatch(loginFail(errmsg));
							}
						}}
					>
						{(props) => (
							<Box>
								{error && (
									<Text fontSize='16px' color='tomato'>
										{error}
									</Text>
								)}

								<FormControl
									isInvalid={props.errors.email && props.touched.email}
								>
									<FormLabel>Email Address:</FormLabel>
									<Input
										id='email-input'
										type='email'
										placeholder='Enter your Email Address'
										name='email'
										value={props.initialValues.email}
										{...props.getFieldProps('email')}
									/>
									<FormErrorMessage>{props.errors.email}</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={props.errors.password && props.touched.password}
								>
									<FormLabel>Password:</FormLabel>
									<InputGroup>
										<Input
											id='password-input'
											type={passwordShow ? 'text' : 'password'}
											placeholder='Enter your Password'
											name='password'
											value={props.initialValues.password}
											{...props.getFieldProps('password')}
										/>
										<InputRightElement width='4.5rem'>
											<IconButton
												variant='unstyled'
												colorScheme='teal'
												size='md'
												aria-label={
													passwordShow ? 'Hide Password' : 'Show Password'
												}
												onClick={handlePasswordShow}
												icon={passwordShow ? <ViewOffIcon /> : <ViewIcon />}
											/>
										</InputRightElement>
									</InputGroup>
									<FormErrorMessage>{props.errors.password}</FormErrorMessage>
								</FormControl>
								<Stack isInline justifyContent='space-between' mt={4}>
									{/* <Box>
										<Checkbox>Remember Me</Checkbox>
									</Box>
									<Box>
										<Link color={`green.500`} href='#'>
											Forget Your Password?
										</Link>
									</Box> */}
								</Stack>
								<Button
									onClick={props.submitForm}
									colorScheme='green'
									rightIcon={<ArrowForwardIcon />}
									width='full'
									mt={4}
									isLoading={isLoading}
									loadingText='Signinig in'
								>
									Sign In
								</Button>
							</Box>
						)}
					</Formik>
				</Box>
			</Box>
		</Flex>
	);
};

export default LoginPage;
