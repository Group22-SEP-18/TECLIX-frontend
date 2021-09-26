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

import React, { useEffect, useState } from 'react';
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
import {
	getLocations,
	filterLocationData,
} from '../../../redux/actions/locationsAction';
import { fetchServiceOrderData } from '../../../redux/actions/serviceOrderActions';
import { selectAllServiceOrders } from '../../../redux/slices/serviceOrderSlice';
import ServiceOrderCard from '../../presentation/serviceOrders/ServiceOrderCard';
import AddFilter from '../AddFilter';

const SalesPersonHistoryContainer = ({ salesperson }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocations());
		dispatch(fetchServiceOrderData);
	}, [dispatch]);
	const serviceOrders = useSelector(selectAllServiceOrders)
		.slice()
		.filter((so) => so.salesperson.email === salesperson.email);
	const [mapFilters, setMapFilters] = useState({
		from: null,
		to: null,
	});
	const { filteredlocations } = useSelector((state) => state.locations);
	const locations = filteredlocations
		.filter((l) => l.salesperson.employee_no === salesperson.employee_no)
		.map((loc) => ({
			latitude: parseFloat(loc.customer.latitude),
			longitude: parseFloat(loc.customer.longitude),
		}));
	useEffect(() => {
		dispatch(filterLocationData(mapFilters));
	}, [dispatch, mapFilters]);
	const onChanges = (value) => {
		setMapFilters({ ...mapFilters, ...value });
	};
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
										key={so.order_id}
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
