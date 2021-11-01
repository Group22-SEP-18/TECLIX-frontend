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
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Spacer,
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
import ServiceOrderDetailsHeader from '../../presentation/serviceOrders/ServiceOrderDetailsHeader';
import ServiceOrderProductTable from '../../presentation/serviceOrders/ServiceOrderProductTable';
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
							{serviceOrders.length ? null : 'No service orders are included'}
							<Accordion allowToggle>
								{serviceOrders.map((serviceOrder) => (
									<AccordionItem>
										<AccordionButton>
											<Box
												id={`serviceorder_div-${serviceOrder.id}`}
												m={2}
												minH='100px'
												overflow='hidden'
												p={2}
												textAlign={'center'}
												_hover={{ cursor: 'pointer' }}
											>
												<ServiceOrderDetailsHeader
													serviceOrder={serviceOrder}
													showSP={false}
													showCustomer={true}
												/>
											</Box>
											<Spacer />
											<AccordionIcon />
										</AccordionButton>
										<AccordionPanel>
											<ServiceOrderProductTable
												order_items={serviceOrder.order_items}
											/>
										</AccordionPanel>
									</AccordionItem>
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
