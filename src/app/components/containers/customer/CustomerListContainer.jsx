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
import {
	filteredCustomers,
	selectAllCustomers,
	setListViewFilter,
} from '../../../redux/slices/customerSlice';
import { getCustomers } from '../../../redux/actions/customerActions';
import CustomerCard from '../../presentation/customer/CustomerCard';
import LoadingCards from '../../common/loading/LoadingCards';
import ErrorOverlay from '../../common/error-overlays/ErrorOverlay';

const CustomerListContainer = ({ onCardClick }) => {
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector(selectAllCustomers);
	const customers = useSelector(filteredCustomers);
	useEffect(() => {
		dispatch(getCustomers());
	}, [dispatch]);
	const onChange = (word) => {
		dispatch(setListViewFilter({ filter: word }));
	};
	return (
		<div>
			{
				<>
					<SearchBar
						placeholder={'Search customers.........'}
						onChange={onChange}
					/>
					{isLoading && <LoadingCards count={3} />}
					{error !== '' && <ErrorOverlay error={error} />}
					<SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: 1, xl: 2 }}>
						{!isLoading &&
							customers &&
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
