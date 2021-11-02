import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Input,
	Box,
	Button,
	Image,
	useToast,
	FormControl,
	FormLabel,
	Select,
	Flex,
	FormErrorMessage,
} from '@chakra-ui/react';
import { ArrowForwardIcon, AttachmentIcon } from '@chakra-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addVehicle } from '../../../redux/actions/vehicleActions';

const AddNewVehicle = (props) => {
	const toast = useToast();
	const fileInputRef = useRef();
	const dispatch = useDispatch();

	var [updateConstant, setupdateConstant] = useState(0);
	const [preview, setPreview] = useState();

	const { isLoading, status, message } = useSelector(
		(state) => state.vehicleRegistration
	);
	var toast_type1 = useCallback(
		(success, message) => {
			toast({
				position: 'bottom-right',
				title: success ? 'Success' : 'Failed',
				description: message,
				status: success ? 'success' : 'error',
				duration: 5000,
				isClosable: true,
			});
		},
		[toast]
	);
	const initialValues = {
		vehicle_number: '',
		vehicle_type: '',
		vehicle_model: '',
		vehicle_image: '/avatars/vehicle.jpg',
	};
	const schema = Yup.object({
		vehicle_number: Yup.string()
			.matches(/^[a-zA-Z0-9 -]+$/, 'Please enter valid barcode')
			.required('Vehicle Number cannot be empty'),
		vehicle_model: Yup.string()
			.min(2, 'Vehicle Model must be at least 2 characters')
			.max(30)
			.matches(/^[a-zA-Z0-9 ]+$/, 'Please enter valid model')
			.required('Vehicle Model cannot be empty'),
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
		dispatch(addVehicle(frmData));
		setupdateConstant((count) => count + 1);
	};
	useEffect(() => {
		if (updateConstant === 1 && !isLoading) {
			toast_type1(status, message);
			setupdateConstant((count) => count - 1);
			props.trigger();
		}
	}, [isLoading, message, props, status, toast_type1, updateConstant]);

	return (
		<Box>
			<Box textAlign='center' alignContent='center'>
				<Flex align='center' justify='center'>
					<Image
						borderRadius='full'
						boxSize='150px'
						src={preview || './avatars/vehicle.jpg'}
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
										name='vehicle_picture'
										accept='image/*'
										type='file'
										hidden
										multiple={false}
										ref={fileInputRef}
										onChange={(e) => {
											props.setFieldValue('vehicle_image', e.target.files[0]);
											const objectUrl = URL.createObjectURL(e.target.files[0]);
											setPreview(objectUrl);
										}}
									/>
								</Button>
							</Box>
							<FormControl
								isInvalid={
									props.errors.vehicle_number && props.touched.vehicle_number
								}
							>
								<FormLabel>Vehicle Number:</FormLabel>
								<Input
									type='vehicle_number'
									placeholder='Enter the Vehicle Number'
									name='vehicle_number'
									value={props.initialValues.vehicle_number}
									{...props.getFieldProps('vehicle_number')}
								/>
								<FormErrorMessage>
									{props.errors.vehicle_number}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									props.errors.vehicle_type && props.touched.vehicle_type
								}
							>
								<FormLabel>Vehicle Type:</FormLabel>
								<Select
									type='text'
									placeholder='Select the Vehicle Type'
									name='vehicle_type'
									value={props.initialValues.vehicle_type}
									{...props.getFieldProps('vehicle_type')}
								>
									<option value='VAN'>Van</option>
									<option value='LORRY'>Lorry</option>
									<option value='TUK'>Tuk</option>
									<option value='BIKE'>Bike</option>
								</Select>
								<FormErrorMessage>{props.errors.vehicle_type}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									props.errors.vehicle_model && props.touched.vehicle_model
								}
							>
								<FormLabel>Vehicle Model:</FormLabel>
								<Input
									type='text'
									placeholder='Enter the Vehicle Model'
									name='vehicle_model'
									value={props.initialValues.vehicle_model}
									{...props.getFieldProps('vehicle_model')}
								/>
								<FormErrorMessage>
									{props.errors.vehicle_model}
								</FormErrorMessage>
							</FormControl>
							<Button
								onClick={props.submitForm}
								colorScheme='green'
								rightIcon={<ArrowForwardIcon />}
								width='full'
								mt={4}
								isLoading={isLoading}
								loadingText='Adding vehicle'
							>
								Register the New Vehicle
							</Button>
						</Box>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

export default AddNewVehicle;
