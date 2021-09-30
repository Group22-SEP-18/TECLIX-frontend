import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Alert,
	AlertIcon,
	AlertDescription,
	Input,
	Box,
	Button,
	Image,
	FormControl,
	FormLabel,
	Select,
	Flex,
	FormErrorMessage,
} from '@chakra-ui/react';
import { ArrowForwardIcon, AttachmentIcon } from '@chakra-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addProduct } from '../../../redux/actions/productActions';

const AddNewProduct = (props) => {
	const fileInputRef = useRef();
	const dispatch = useDispatch();
	const [preview, setPreview] = useState();
	const { isLoading, status, message } = useSelector(
		(state) => state.productRegistration
	);
	const initialValues = {
		short_name: '',
		long_name: '',
		barcode: '',
		category: '',
		price: '',
		product_picture: '/avatars/default.png',
	};

	const schema = Yup.object({
		price: Yup.string()
			.min(1, 'Please enter valid amount')
			.max(10)
			.matches(
				/^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/,
				'Please enter valid amount'
			)
			.required('Price no cannot be empty'),
		short_name: Yup.string()
			.min(2, 'Short Name must be at least 2 characters')
			.max(20)
			.matches(/^[a-zA-Z0-9 ]+$/, 'Please enter valid name')
			.required('Short name cannot be empty'),
		long_name: Yup.string()
			.min(4, 'Long Name must be at least 4 characters')
			.max(100)
			.matches(/^[a-zA-Z0-9 ]+$/, 'Please enter valid name')
			.required('Long Name cannot be empty'),
		barcode: Yup.string()
			.length(10, 'Barcode must be 10 digits')
			.matches(/^[a-zA-Z0-9 -]+$/, 'Please enter valid barcode')
			.required('Contact no cannot be empty'),
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
		console.log(values);
		const frmData = jsonToFormData(values);
		dispatch(addProduct(frmData));
	};
	return (
		<Box>
			<Box textAlign='center' alignContent='center'>
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
						src={preview || './avatars/product.jpg'}
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
									Upload Image
									<Input
										name='profile_picture'
										accept='image/*'
										type='file'
										hidden
										multiple={false}
										ref={fileInputRef}
										onChange={(e) => {
											props.setFieldValue('product_picture', e.target.files[0]);
											const objectUrl = URL.createObjectURL(e.target.files[0]);
											setPreview(objectUrl);
										}}
									/>
								</Button>
							</Box>
							<FormControl
								isInvalid={props.errors.long_name && props.touched.long_name}
							>
								<FormLabel>Long Name:</FormLabel>
								<Input
									type='long_name'
									placeholder='Enter the Long Name'
									name='long_name'
									value={props.initialValues.long_name}
									{...props.getFieldProps('long_name')}
								/>
								<FormErrorMessage>{props.errors.long_name}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={props.errors.short_name && props.touched.short_name}
							>
								<FormLabel>Short Name:</FormLabel>
								<Input
									type='test'
									placeholder='Enter the Short Name'
									name='short_name'
									value={props.initialValues.short_name}
									{...props.getFieldProps('short_name')}
								/>
								<FormErrorMessage>{props.errors.short_name}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={props.errors.barcode && props.touched.barcode}
							>
								<FormLabel>Bar Code:</FormLabel>
								<Input
									type='text'
									placeholder='Enter the Barcode'
									name='barcode'
									value={props.initialValues.barcode}
									{...props.getFieldProps('barcode')}
								/>
								<FormErrorMessage>{props.errors.barcode}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={props.errors.category && props.touched.category}
							>
								<FormLabel>Category:</FormLabel>
								<Select
									type='text'
									placeholder='Select the Product category'
									name='category'
									value={props.initialValues.category}
									{...props.getFieldProps('category')}
								>
									<option value='biscuit'>Biscuit</option>
									<option value='chips'>Chips</option>
									<option value='cookies'>Cookies</option>
									<option value='cheese'>Cheese</option>
								</Select>
								<FormErrorMessage>{props.errors.category}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={props.errors.price && props.touched.price}
							>
								<FormLabel>Unit Price:</FormLabel>
								<Input
									type='number'
									placeholder='Enter the Unit Price'
									name='price'
									value={props.initialValues.price}
									{...props.getFieldProps('price')}
								/>
								<FormErrorMessage>{props.errors.price}</FormErrorMessage>
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
								Register the New Product
							</Button>
						</Box>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

export default AddNewProduct;
