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
import { Accordion } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllServiceOrders } from '../../../redux/slices/serviceOrderSlice';
import ServiceOrderCard from '../../presentation/serviceOrders/ServiceOrderCard';
import AddFilter from '../AddFilter';
import { fetchServiceOrderData } from '../../../redux/actions/serviceOrderActions';

const CustomerSOHistoryContainer = ({ customer }) => {
	const dispatch = useDispatch();
	const serviceOrders = useSelector(selectAllServiceOrders)
		.slice()
		.filter((so) => so.customer.shop_name === customer.shop_name);
	useEffect(() => {
		dispatch(fetchServiceOrderData());
	}, [dispatch]);
	return (
		<div>
			<AddFilter />
			<Accordion allowToggle>
				{serviceOrders.map((so) => (
					<ServiceOrderCard key={so.order_id} serviceOrder={so} />
				))}
			</Accordion>
		</div>
	);
};

CustomerSOHistoryContainer.propTypes = { customer: PropTypes.object };

export default CustomerSOHistoryContainer;
