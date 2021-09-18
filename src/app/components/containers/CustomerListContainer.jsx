/**
 * Summary.
 * Persentation of customers list view
 *
 * Description.
 *
 * @file   This files defines the customers list view
 * @author Hirumal Priyashan.
 * @since  16.09.2021
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../common/SearchBar';
import {
	selectAllCustomers,
	getCustomersAsync,
} from '../../redux/slices/customerSlice';

const CustomerListContainer = (onCardClick) => {
	const dispatch = useDispatch();
	const customers = useSelector(selectAllCustomers);
	useEffect(() => {
		dispatch(getCustomersAsync());
	}, [dispatch]);
	return (
		<div>
			{
				<>
					<SearchBar placeholder={'Search salespersons.........'} />
					{customers.map(
						(customer, index) =>
							// <SalesPersonCard
							// 	salesperson={salesperson}
							// 	key={index}
							// 	onClick={onCardClick}
							// />
							customer.shop_name
					)}
				</>
			}
		</div>
	);
};

CustomerListContainer.propTypes = {};

export default CustomerListContainer;
