/**
 * Summary.
 * Persentation of single sales person view container
 *
 * Description.
 *
 * @file   This files defines the single sales person view.
 * @author Hirumal Priyashan.
 * @since  10.09.2021
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Accordion,
	Box,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Input,
	InputGroup,
	InputLeftAddon,
	Stack,
} from '@chakra-ui/react';
import MapWithHeader from '../../common/map/MapWithHeader';
import { getLocationsAsync } from '../../../redux/slices/locationsSlice';
import {
	selectAllServiceOrders,
	getServiceOrdersAsync,
} from '../../../redux/slices/serviceOrderSlice';
import ServiceOrderCard from '../../presentation/serviceOrders/ServiceOrderCard';
import AddFilter from '../AddFilter';
import {
	filteredLocations,
	setFromFilter,
	setSPFilter,
	setToFilter,
} from '../../../redux/slices/locationsSlice';

const SalesPersonHistoryContainer = ({ salesperson }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocationsAsync());
		dispatch(getServiceOrdersAsync());
		dispatch(setSPFilter(salesperson.employee_no));
	}, [dispatch, salesperson]);
	const serviceOrders = useSelector(selectAllServiceOrders)
		.slice()
		.filter((so) => so.salesperson.email === salesperson.email);
	const locations = useSelector(filteredLocations);
	return (
		<Box pt='4'>
			<Tabs variant='soft-rounded' colorScheme='green'>
				<TabList>
					<Tab ml='4'>Travelling History</Tab>
					<Tab>Service Order History</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Stack direction='row' spacing={4}>
							<InputGroup>
								<InputLeftAddon children={'From'} />
								<Input
									type='date'
									placeholder='Select Date'
									onChange={(event) =>
										dispatch(setFromFilter(event.target.value))
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon children={'To'} />
								<Input
									type='date'
									placeholder='Select Date'
									onChange={(event) =>
										dispatch(setToFilter(event.target.value))
									}
								/>
							</InputGroup>
						</Stack>
						<Box
							maxW='100%'
							maxH='60%'
							borderWidth='1px'
							borderRadius='xl'
							overflowY='hidden'
						>
							<MapWithHeader locations={locations} />
						</Box>
					</TabPanel>
					<TabPanel>
						<Tabs align='end' variant='soft-rounded' colorScheme='green'>
							<AddFilter />
							<Accordion allowToggle>
								{serviceOrders.map((so) => (
									<ServiceOrderCard
										key={so.id}
										serviceOrder={so}
										showCustomer={true}
										showSP={false}
									/>
								))}
							</Accordion>
						</Tabs>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

SalesPersonHistoryContainer.propTypes = { salesperson: PropTypes.object };

export default SalesPersonHistoryContainer;
