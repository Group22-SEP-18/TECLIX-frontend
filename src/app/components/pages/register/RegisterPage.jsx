import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReachLink } from 'react-router-dom';
import {
	Alert,
	AlertIcon,
	AlertDescription,
	Box,
	Button,
	IconButton,
	Image,
	FormControl,
	FormLabel,
	Link,
	Heading,
	Input,
	Flex,
	InputGroup,
	InputRightElement,
	FormErrorMessage,
} from '@chakra-ui/react';
import {
	ArrowForwardIcon,
	ViewIcon,
	ViewOffIcon,
	AttachmentIcon,
} from '@chakra-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserRegistration } from '../../../redux/actions/userActions';

const RegisterPage = (props) => {
	const fileInputRef = useRef();
	const dispatch = useDispatch();
	const [passwordShow, setPasswordShow] = useState(false);
	const [preview, setPreview] = useState();
	const { isLoading, status, message } = useSelector(
		(state) => state.registration
	);
	const handlePasswordShow = () => setPasswordShow(!passwordShow);
	const initialValues = {
		email: '',
		employee_no: '',
		user_role: 'OFFICER',
		first_name: '',
		last_name: '',
		contact_no: '',
		password: '',
		confirm_password: '',
		profile_picture: '/avatars/default.png',
	};
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const schema = Yup.object({
		email: Yup.string()
			.max(100)
			.email('Invalid email')
			.required('Email cannot be empty'),
		employee_no: Yup.string()
			.max(10)
			.matches(/^[A-Za-z0-9 ]*$/, 'Please enter valid employee number')
			.required('Employee no cannot be empty'),
		first_name: Yup.string()
			.min(2, 'First name must be at least 2 characters')
			.max(100)
			.matches(/^[a-zA-Z]+$/, 'Please enter valid name')
			.required('First name cannot be empty'),
		last_name: Yup.string()
			.min(2, 'Last name must be at least 2 characters')
			.max(100)
			.matches(/^[a-zA-Z]+$/, 'Please enter valid name')
			.required('Last name cannot be empty'),
		contact_no: Yup.string()
			.matches(phoneRegExp, 'Please enter valid name phone number')
			.required('Contact no cannot be empty'),
		password: Yup.string()
			.required('Please Enter your password')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
			),
		confirm_password: Yup.string()
			.required()
			.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	});
	const buildFormData = (formData, data, parentKey) => {
		if (
			data &&
			typeof data === 'object' &&
			!(data instanceof Date) &&
			!(data instanceof File)
		) {
			Object.keys(data).forEach((key) => {
				buildFormData(
					formData,
					data[key],
					parentKey ? `${parentKey}[${key}]` : key
				);
			});
		} else {
			const value = data == null ? '' : data;
			formData.append(parentKey, value);
		}
	};

	const jsonToFormData = (data) => {
		const formData = new FormData();
		buildFormData(formData, data);
		return formData;
	};
	const onSubmit = async (values) => {
		const frmData = jsonToFormData(values);
		dispatch(UserRegistration(frmData));
	};
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
				<Box textAlign='center' alignContent='center'>
					<Heading>Sign up with TECLIX</Heading>
					<Link as={ReachLink} to='/login' my={8} textColor='blue'>
						Already have an account?
					</Link>
					{message && (
						<Alert my={4} status={status === 'success' ? 'success' : 'error'}>
							<AlertIcon />
							<AlertDescription>{message}</AlertDescription>
						</Alert>
					)}
					<Flex align='center' justify='center'>
						<Image
							borderRadius='full'
							boxSize='150px'
							src={preview || './avatars/defaul.png'}
						/>
					</Flex>
				</Box>

				<Box my={8} textAlign='center'>
					<Formik
						initialValues={initialValues}
						validationSchema={schema}
						onSubmit={(values) => onSubmit(values)}
					>
						{(props) => (
							<Box>
								<Box
									display='flex'
									textAlign='center'
									justifyContent='center'
									flexDirection='column'
								>
									<Button
										variant='contained'
										component='label'
										rightIcon={<AttachmentIcon />}
										onClick={() => fileInputRef.current.click()}
									>
										Choose Avatar
										<Input
											name='profile_picture'
											accept='image/*'
											type='file'
											hidden
											multiple={false}
											ref={fileInputRef}
											onChange={(e) => {
												props.setFieldValue(
													'profile_picture',
													e.target.files[0]
												);
												const objectUrl = URL.createObjectURL(
													e.target.files[0]
												);
												setPreview(objectUrl);
											}}
										/>
									</Button>
								</Box>
								<FormControl
									isInvalid={props.errors.email && props.touched.email}
								>
									<FormLabel>Email Address:</FormLabel>
									<Input
										type='email'
										placeholder='Enter your Email Address'
										name='email'
										value={props.initialValues.email}
										{...props.getFieldProps('email')}
									/>
									<FormErrorMessage>{props.errors.email}</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={
										props.errors.employee_no && props.touched.employee_no
									}
								>
									<FormLabel>Employee No:</FormLabel>
									<Input
										type='test'
										placeholder='Enter your Employee no'
										name='employee_no'
										value={props.initialValues.employee_no}
										{...props.getFieldProps('employee_no')}
									/>
									<FormErrorMessage>
										{props.errors.employee_no}
									</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={
										props.errors.first_name && props.touched.first_name
									}
								>
									<FormLabel>First name:</FormLabel>
									<Input
										type='text'
										placeholder='Enter your first name'
										name='first_name'
										value={props.initialValues.first_name}
										{...props.getFieldProps('first_name')}
									/>
									<FormErrorMessage>{props.errors.first_name}</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={props.errors.last_name && props.touched.last_name}
								>
									<FormLabel>Last name:</FormLabel>
									<Input
										type='text'
										placeholder='Enter your last name'
										name='last_name'
										value={props.initialValues.last_name}
										{...props.getFieldProps('last_name')}
									/>
									<FormErrorMessage>{props.errors.last_name}</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={
										props.errors.contact_no && props.touched.contact_no
									}
								>
									<FormLabel>Mobile Number:</FormLabel>
									<Input
										type='text'
										placeholder='Enter your Contact no'
										name='contact_no'
										value={props.initialValues.contact_no}
										{...props.getFieldProps('contact_no')}
									/>
									<FormErrorMessage>{props.errors.contact_no}</FormErrorMessage>
								</FormControl>
								<FormControl
									isInvalid={props.errors.password && props.touched.password}
								>
									<FormLabel>Password:</FormLabel>
									<InputGroup>
										<Input
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
								<FormControl
									isInvalid={
										props.errors.confirm_password &&
										props.touched.confirm_password
									}
								>
									<FormLabel>Confirm Password:</FormLabel>
									<Input
										type='password'
										placeholder='Enter your Password Again'
										name='confirm_password'
										value={props.initialValues.confirm_password}
										{...props.getFieldProps('confirm_password')}
									/>
									<FormErrorMessage>
										{props.errors.confirm_password}
									</FormErrorMessage>
								</FormControl>
								<Button
									onClick={props.submitForm}
									colorScheme='green'
									rightIcon={<ArrowForwardIcon />}
									width='full'
									mt={4}
									isLoading={isLoading}
									loadingText='Signinig up'
								>
									Sign Up
								</Button>
							</Box>
						)}
					</Formik>
				</Box>
			</Box>
		</Flex>
	);
};

export default RegisterPage;
