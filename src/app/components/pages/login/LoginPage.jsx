import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	FormHelperText,
	useColorModeValue,
} from '@chakra-ui/react';

// import { userActions } from '../../redux/actions';

const LoginPage = (props) => {
	const { loggingIn } = props;
	const [state, changeState] = useState({
		email: '',
		password: '',
		submitted: false,
	});
	const handleChange = (value) => {
		changeState({ ...state, ...value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		changeState(...state, { submitted: true });
		if (state.email && state.password) {
			props.login(state.email, state.password);
		}
	};
	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign in to your account</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id='email'>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								value={state.email}
								onChange={(e) => handleChange({ email: e.target.value })}
							/>
							{state.submitted && !state.email && (
								<FormHelperText>Username is required</FormHelperText>
							)}
						</FormControl>
						<FormControl id='password'>
							<FormLabel>Password</FormLabel>
							<Input
								type='password'
								value={state.password}
								onChange={(e) => handleChange({ password: e.target.value })}
							/>
							{state.submitted && !state.password && (
								<FormHelperText>Password is required</FormHelperText>
							)}
						</FormControl>
						<Stack spacing={10}>
							<Stack
								direction={{ base: 'column', sm: 'row' }}
								align={'start'}
								justify={'space-between'}
							>
								<Checkbox>Remember me</Checkbox>
								<Link color={'blue.400'}>Forgot password?</Link>
							</Stack>
							<Button
								bg={'blue.400'}
								color={'white'}
								onClick={handleSubmit}
								isLoading={loggingIn}
								_hover={{
									bg: 'blue.500',
								}}
							>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
};

// function mapState(state) {
// 	const { loggingIn } = state.authentication;
// 	return { loggingIn };
// }

// const actionCreators = {
// 	login: userActions.login,
// 	logout: userActions.logout,
// };

// const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
// export { connectedLoginPage as LoginPage };

export default LoginPage;
