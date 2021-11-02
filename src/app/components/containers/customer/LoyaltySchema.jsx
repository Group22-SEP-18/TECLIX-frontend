import React, { useEffect, useState } from 'react';
import {
	Button,
	FormControl,
	FormErrorMessage,
	Modal,
	ModalOverlay,
	ModalContent,
	Input,
	InputGroup,
	InputRightAddon,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	useToast,
	useDisclosure,
} from '@chakra-ui/react';
import { SettingsIcon, CheckIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
	selectLoyaltyPointSchema,
	getloyaltyPointSchemaAsync,
} from '../../../redux/slices/loyaltyPointSchemaSlice';
import { updateLoyaltyPointSchema } from '../../../../api/customersApi';

const LeaderboardSchema = (props) => {
	const dispatch = useDispatch();
	const loyaltyPointSchema = useSelector(selectLoyaltyPointSchema);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [updateMode, setUpdateMode] = useState({
		key: null,
		isInUpdateMode: false,
	});
	const toast = useToast();
	const showToast = (title, status, description) =>
		toast({
			position: 'bottom-right',
			title: title,
			description: description,
			status: status,
			duration: 5000,
			isClosable: true,
		});
	const handleSubmit = async (data) => {
		try {
			const result = await updateLoyaltyPointSchema(data.id, {
				percentage: data.percentage,
				bonus_points: data.bonus_points,
			});
			if (result.id) {
				showToast(
					'Schema updated.',
					'success',
					'Loyalty schema updated successfully'
				);
				setUpdateMode({
					key: null,
					isInUpdateMode: false,
				});
				dispatch(getloyaltyPointSchemaAsync());
			} else {
				showToast('An error occurred.', 'error', 'Schema update failed');
			}
		} catch (error) {
			showToast('An error occurred.', 'error', 'Schema update failed');
		}
	};
	const cancelUpdate = () => {
		setUpdateMode({
			key: null,
			isInUpdateMode: false,
		});
		showToast('No changes', 'info', '');
	};
	useEffect(() => {
		dispatch(getloyaltyPointSchemaAsync());
	}, [dispatch]);
	return (
		<>
			<Button rightIcon={<SettingsIcon />} colorScheme='gray' onClick={onOpen}>
				Loyalty Point Schema
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size='4xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Loyalty Point Schema</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Table variant='unstyled'>
							<Thead>
								<Tr>
									<Th>Points Type</Th>
									<Th isNumeric>Percentage</Th>
									<Th isNumeric>Bonus Points</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{loyaltyPointSchema.map((row, i) => (
									<Tr my='1' key={i}>
										<Td>{row.points_type}</Td>
										{updateMode.key !== i ? (
											<>
												<Td isNumeric>{row.percentage} %</Td>
												<Td isNumeric>{row.bonus_points} points</Td>
												<Td>
													<Button
														rightIcon={<EditIcon />}
														colorScheme='gray'
														onClick={() => {
															setUpdateMode({ isInUpdateMode: true, key: i });
														}}
													>
														Edit Criteria
													</Button>
												</Td>
											</>
										) : (
											UpdateSchemaView(row, handleSubmit, cancelUpdate)
										)}
									</Tr>
								))}
							</Tbody>
						</Table>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

LeaderboardSchema.propTypes = {};

export default LeaderboardSchema;

const UpdateSchemaView = (row, handleSubmit, cancelUpdate) => {
	return (
		<Formik
			initialValues={{
				id: row.id,
				points_type: row.points_type,
				percentage: row.percentage,
				bonus_points: row.bonus_points,
			}}
			validationSchema={Yup.object({
				percentage: Yup.number()
					.test(
						'max',
						'Percentage should be less than 100',
						(number) => number < 100
					)
					.test(
						'min',
						'Percentage should be larger than 0',
						(number) => number >= 0
					)
					.required('Percentage cannot be empty'),
				bonus_points: Yup.number()
					.test(
						'min',
						'Bonus points should be larger than 0',
						(number) => number >= 0
					)
					.required('Bonus points cannot be empty'),
			})}
			onSubmit={async (values) =>
				_.isEqual(row, values) ? cancelUpdate() : handleSubmit(values)
			}
		>
			{(props) => (
				<>
					<Td>
						<FormControl
							isInvalid={props.errors.percentage && props.touched.percentage}
						>
							<InputGroup>
								<Input
									type='percentage'
									name='percentage'
									value={props.initialValues.percentage}
									{...props.getFieldProps('percentage')}
								/>
								<InputRightAddon children='%' size='sm' />
							</InputGroup>
							<FormErrorMessage>{props.errors.percentage}</FormErrorMessage>
						</FormControl>
					</Td>
					<Td>
						<FormControl
							isInvalid={
								props.errors.bonus_points && props.touched.bonus_points
							}
						>
							<InputGroup>
								<Input
									type='bonus_points'
									name='bonus_points'
									value={props.initialValues.bonus_points}
									{...props.getFieldProps('bonus_points')}
								/>
								<InputRightAddon children='points' size='sm' />
							</InputGroup>
							<FormErrorMessage>{props.errors.bonus_points}</FormErrorMessage>
						</FormControl>
					</Td>
					<Td>
						<Button
							rightIcon={<CheckIcon />}
							colorScheme='gray'
							onClick={props.submitForm}
							mt={4}
							// isLoading={isLoading}
							loadingText='Signinig in'
						>
							Apply Changes
						</Button>
						<Button
							rightIcon={<CloseIcon />}
							colorScheme='gray'
							onClick={cancelUpdate}
							mt={4}
						>
							Cancel
						</Button>
					</Td>
				</>
			)}
		</Formik>
	);
};
