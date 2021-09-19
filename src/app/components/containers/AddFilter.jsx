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
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
	Tag,
	TagLabel,
	TagCloseButton,
} from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';

const AddFilter = (props) => {
	const [showingFilters, setShowFilters] = useState(false);
	const [changes, setchanges] = useState({});
	const [filters, setFilters] = useState({
		from: null,
		to: null,
		minimumPrice: null,
		maximumPrice: null,
		salesperson: null,
		shopName: null,
		shopLocation: 'null',
	});
	const onChanges = (value) => {
		setchanges({ ...changes, ...value });
	};
	const ApplyFilters = () => {
		setShowFilters(false);
		setFilters({ ...filters, ...changes });
	};
	const onClickClose = (filterName) => {
		setFilters({ ...filters, [filterName]: null });
		setchanges({ ...changes, [filterName]: null });
	};
	return (
		<Box m={4}>
			{showingFilters && (
				<Stack spacing={4}>
					<InputGroup>
						<InputLeftAddon children={'Salesperson'} />
						<Input
							type='text'
							placeholder='Enter key for the salesperson you are looking for'
							onChange={(event) =>
								onChanges({ salesperson: event.target.value })
							}
						/>
					</InputGroup>
					<InputGroup>
						<InputLeftAddon children={'Shop Name'} />
						<Input
							type='text'
							placeholder='Enter key for the customer you are looking for'
							onChange={(event) => onChanges({ shopName: event.target.value })}
						/>
					</InputGroup>
					<InputGroup>
						<InputLeftAddon children={'Shop Location'} />
						<Input
							type='text'
							placeholder='Enter key for the town you are looking for'
							onChange={(event) =>
								onChanges({ shopLocation: event.target.value })
							}
						/>
					</InputGroup>
					<Stack direction='row' spacing={4}>
						<InputGroup>
							<InputLeftAddon children={'From'} />
							<Input
								type='date'
								placeholder='Select Date'
								onChange={(event) => onChanges({ from: event.target.value })}
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftAddon children={'To'} />
							<Input
								type='date'
								placeholder='Select Date'
								onChange={(event) => onChanges({ to: event.target.value })}
							/>
						</InputGroup>
					</Stack>
					<Stack direction='row' spacing={4}>
						<InputGroup>
							<InputLeftAddon children='Minimum Total Rs.' />
							<Input
								type='number'
								placeholder='Enter amount'
								onChange={(event) =>
									onChanges({ minimumPrice: event.target.value })
								}
							/>
						</InputGroup>
						<InputGroup>
							<InputLeftAddon children='Maximum Total Rs.' />
							<Input
								type='number'
								placeholder='Enter amount'
								onChange={(event) =>
									onChanges({ maximumPrice: event.target.value })
								}
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
					onClick={() =>
						showingFilters ? ApplyFilters() : setShowFilters(!showingFilters)
					}
					rightIcon={showingFilters ? <CheckIcon /> : null}
				>
					{showingFilters ? 'Apply Filters' : 'Add Filters'}
				</Button>
			</Stack>
			<HStack spacing={4}>
				{Object.keys(filters).map((key) =>
					filters[key] !== null ? (
						<Tag
							size={'lg'}
							key={key}
							borderRadius='full'
							pb={1}
							variant='solid'
							colorScheme='green'
							minW='150'
						>
							<TagLabel>
								{key} : {filters[key]}
							</TagLabel>
							<TagCloseButton pt={1} onClick={(key) => onClickClose(key)} />
						</Tag>
					) : null
				)}
			</HStack>
		</Box>
	);
};

AddFilter.propTypes = {};

export default AddFilter;
