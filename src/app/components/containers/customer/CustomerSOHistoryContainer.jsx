/**
 * Summary.
 * Persentation of single a customer view.
 *
 * Description.
 *
 * @file   This files defines the single a customer view.
 * @author Hirumal Priyashan.
 * @since  17.09.2021
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Spacer,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import {
	filteredServiceOrders,
	clearFilters,
	isServiceOrdersLoadig,
	getServiceOrdersAsync,
} from '../../../redux/slices/serviceOrderSlice';
import ServiceOrderDetailsHeader from '../../presentation/serviceOrders/ServiceOrderDetailsHeader';
import ServiceOrderProductTable from '../../presentation/serviceOrders/ServiceOrderProductTable';
import AddFilter from '../AddFilter';
import LoadingSkelton from '../../common/loading/LoadingSkelton';

const CustomerSOHistoryContainer = ({ customer }) => {
	const dispatch = useDispatch();
	const serviceOrders = useSelector(filteredServiceOrders)
		.slice()
		.filter((so) => so.customer.shop_name === customer.shop_name);
	useEffect(() => {
		dispatch(clearFilters());
		dispatch(getServiceOrdersAsync());
	}, [dispatch]);
	const isSOLoading = useSelector(isServiceOrdersLoadig);
	return (
		<div>
			<AddFilter isCustomerView={true} />
			{isSOLoading && <LoadingSkelton />}
			{!isSOLoading && (
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
										showSP={true}
										showCustomer={false}
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
					{serviceOrders.length ? null : 'No service orders are included'}
				</Accordion>
			)}
		</div>
	);
};

CustomerSOHistoryContainer.propTypes = { customer: PropTypes.object };

export default CustomerSOHistoryContainer;
