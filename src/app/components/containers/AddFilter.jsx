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
	const onChanges = (value) => {
		setchanges({ ...changes, ...value });
	};
	return (
		<Box m={4}>
			{showingFilters && (
				<Stack spacing={4}>
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
									dispatch(setFromFilter(event.target.value));
									onChanges({ from: event.target.value });
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
									dispatch(setToFilter(event.target.value));
									onChanges({ to: event.target.value });
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
