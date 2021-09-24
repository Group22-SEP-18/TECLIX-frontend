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
import { SimpleGrid } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../common/SearchBar';
import { selectAllCustomers } from '../../../redux/slices/customerSlice';
import { getCustomers } from '../../../redux/actions/customerActions';
import CustomerCard from '../../presentation/customer/CustomerCard';

const CustomerListContainer = ({ onCardClick }) => {
	const dispatch = useDispatch();
	const { customers } = useSelector((state) => state.customers);
	useEffect(() => {
		dispatch(getCustomers());
	}, [dispatch]);
	return (
		<div>
			{
				<>
					<SearchBar placeholder={'Search customers.........'} />
					<SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: 1, xl: 2 }}>
						{customers &&
							customers.map((customer, index) => (
								<CustomerCard
									customer={customer}
									key={index}
									onClick={onCardClick}
								/>
							))}
					</SimpleGrid>
				</>
			}
		</div>
	);
};

CustomerListContainer.propTypes = {};

export default CustomerListContainer;
