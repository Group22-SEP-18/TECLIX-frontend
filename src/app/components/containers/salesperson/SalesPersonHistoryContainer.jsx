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
import {
	getLocationsAsync,
	isLocationsLoading,
} from '../../../redux/slices/locationsSlice';
import {
	filteredServiceOrders,
	clearFilters,
	getServiceOrdersAsync,
	isServiceOrdersLoadig,
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
import LoadingSkelton from '../../common/loading/LoadingSkelton';

const SalesPersonHistoryContainer = ({ salesperson }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocationsAsync());
		dispatch(getServiceOrdersAsync());
		dispatch(clearFilters());
		dispatch(setSPFilter(salesperson.employee_no));
	}, [dispatch, salesperson]);
	const serviceOrders = useSelector(filteredServiceOrders)
		.slice()
		.filter((so) => so.salesperson.email === salesperson.email);
	const locations = useSelector(filteredLocations);
	const isLocationLoading = useSelector(isLocationsLoading);
	const isSOLoading = useSelector(isServiceOrdersLoadig);
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
							mt='4'
							maxW='100%'
							maxH='60%'
							borderWidth='1px'
							borderRadius='xl'
							overflowY='hidden'
						>
							{isLocationLoading && <LoadingSkelton />}
							{!isLocationLoading && (
								<MapWithHeader locations={locations} height='650px' />
							)}
						</Box>
					</TabPanel>
					<TabPanel>
						<Tabs align='end' variant='soft-rounded' colorScheme='green'>
							<AddFilter isSalesPersonView={true} />
							{isSOLoading && <LoadingSkelton />}
							{!isSOLoading && (
								<>
									{serviceOrders.length
										? null
										: 'No service orders are included'}
									<Accordion allowToggle>
										{serviceOrders.map((serviceOrder) => (
											<AccordionItem
												key={`serviceorder_accordion_item-${serviceOrder.id}`}
											>
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
								</>
							)}
						</Tabs>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

SalesPersonHistoryContainer.propTypes = { salesperson: PropTypes.object };

export default SalesPersonHistoryContainer;
