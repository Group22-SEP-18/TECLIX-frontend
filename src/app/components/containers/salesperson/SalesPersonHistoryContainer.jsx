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
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import SimpleMap from '../../common/map/SimpleMap';
import { getLocations } from '../../../redux/actions/locationsAction';
import { fetchServiceOrderData } from '../../../redux/actions/serviceOrderActions';

const SalesPersonHistoryContainer = ({ salesperson }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLocations());
		dispatch(fetchServiceOrderData);
	}, [dispatch]);
	const { isLoading, serviceOrders, error } = useSelector(
		(state) => state.serviceOrder
	);
	const { _, locations, filteredlocations, __ } = useSelector(
		(state) => state.locations
	);
	return (
		<Box pt='4'>
			<Tabs variant='soft-rounded' colorScheme='green'>
				<TabList>
					<Tab ml='4'>Travelling History</Tab>
					<Tab>Service Order History</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<Tabs align='end' variant='soft-rounded' colorScheme='green'>
							<TabList>
								<Tab>Today</Tab>
								<Tab>Month</Tab>
								<Tab>AllTime</Tab>
							</TabList>
							<TabPanels>
								{[...Array(3)].map((x, i) => (
									<TabPanel key={i}>
										<Box
											h='670px'
											borderWidth='1px'
											borderRadius='xl'
											overflow='hidden'
										>
											<SimpleMap />
										</Box>
									</TabPanel>
								))}
							</TabPanels>
						</Tabs>
					</TabPanel>
					<TabPanel>
						<Tabs align='end' variant='soft-rounded' colorScheme='green'>
							<TabList>
								<Tab>Today</Tab>
								<Tab>Month</Tab>
								<Tab>AllTime</Tab>
							</TabList>
							<TabPanels>
								{[...Array(3)].map((x, i) => (
									<TabPanel key={i}>
										No Service Order History Available
									</TabPanel>
								))}
							</TabPanels>
						</Tabs>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

SalesPersonHistoryContainer.propTypes = { salesperson: PropTypes.object };

export default SalesPersonHistoryContainer;
