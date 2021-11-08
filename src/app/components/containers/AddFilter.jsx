/**
 * Summary.
 * Persentation of filtering component.
 *
 * Description.
 *
 * @file   This files defines the filtering component.
 * @author Hirumal Priyashan.
 * @since  18.09.2021
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	Text,
	Stack,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import {
	setFromFilter,
	setShopFilter,
	setSPFilter,
	setToFilter,
} from '../../redux/slices/serviceOrderSlice';

const AddFilter = ({ isSalesPersonView, isCustomerView }) => {
	const dispatch = useDispatch();
	const [showingFilters, setShowFilters] = useState(false);
	const [changes, setchanges] = useState({
		salesperson: '',
		from: '',
		to: '',
		customer: '',
	});
	const [error, setError] = useState(null);
	const validate = (field, newValue) => {
		// from  should be smaller than today and to value
		var newTime = new Date(`${newValue}T00:00:00.000Z`).getTime();
		if (field === 'from') {
			if (changes.to === '') {
				let toTime = new Date().getTime();
				if (newTime > toTime) {
					setError(
						'Starting date should be a date before today, previous starting date have used'
					);
					return false;
				}
			}
			if (changes.to !== '') {
				let toTime = new Date(`${changes.to}T00:00:00.000Z`).getTime();
				if (newTime > toTime) {
					setError(
						'Starting date should be a date before ending date, previous starting date have used'
					);
					return false;
				}
			}
		}
		if (field === 'to') {
			if (changes.from !== '') {
				let fromTime = new Date(`${changes.from}T00:00:00.000Z`).getTime();
				if (fromTime > newTime) {
					setError(
						'Ending date should be a date after starting date, previous ending date have used'
					);
					return false;
				}
			}
		}
		return true;
	};
	const onChanges = (value) => {
		setchanges({ ...changes, ...value });
	};
	return (
		<Box m={4}>
			{showingFilters && (
				<Stack spacing={4}>
					{error && <Text color='tomato'>{error}</Text>}
					{isCustomerView && (
						<InputGroup>
							<InputLeftAddon children={'Salesperson'} />
							<Input
								type='text'
								placeholder='Enter key for the salesperson you are looking for'
								onChange={(event) => {
									dispatch(setSPFilter(event.target.value));
									onChanges({ salesperson: event.target.value });
								}}
								value={changes.salesperson}
							/>
						</InputGroup>
					)}
					{isSalesPersonView && (
						<InputGroup>
							<InputLeftAddon children={'Shop Name'} />
							<Input
								type='text'
								placeholder='Enter key for the customer you are looking for'
								onChange={(event) => {
									dispatch(setShopFilter(event.target.value));
									onChanges({ customer: event.target.value });
								}}
								value={changes.customer}
							/>
						</InputGroup>
					)}
					<Stack direction='row' spacing={4}>
						<InputGroup>
							<InputLeftAddon children={'From'} />
							<Input
								type='date'
								placeholder='Select Date'
								onChange={(event) => {
									if (validate('from', event.target.value)) {
										dispatch(setFromFilter(event.target.value));
										onChanges({ from: event.target.value });
										setError(null);
									}
								}}
								value={changes.from}
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftAddon children={'To'} />
							<Input
								type='date'
								placeholder='Select Date'
								onChange={(event) => {
									if (validate('to', event.target.value)) {
										dispatch(setToFilter(event.target.value));
										onChanges({ to: event.target.value });
										setError(null);
									}
								}}
								value={changes.to}
							/>
						</InputGroup>
					</Stack>
				</Stack>
			)}
			<Stack direction='row' spacing={4} justify='end' my={4}>
				<Button
					leftIcon={showingFilters ? null : <AddIcon />}
					colorScheme='green'
					variant='solid'
					onClick={() => setShowFilters(!showingFilters)}
					rightIcon={showingFilters ? <CheckIcon /> : null}
				>
					{showingFilters ? 'Done' : 'Add Filters'}
				</Button>
			</Stack>
		</Box>
	);
};

AddFilter.propTypes = {};

export default AddFilter;
