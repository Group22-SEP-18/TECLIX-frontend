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
import { SimpleGrid, Spacer, HStack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../common/SearchBar';
import {
	filteredCustomers,
	selectAllCustomers,
	setListViewFilter,
	getCustomersAsync,
} from '../../../redux/slices/customerSlice';
import CustomerCard from '../../presentation/customer/CustomerCard';
import LoadingCards from '../../common/loading/LoadingCards';
import ErrorOverlay from '../../common/error-overlays/ErrorOverlay';
import LoyaltySchema from './LoyaltySchema';
import { selectUserRole } from '../../../redux/slices/userSlice';

const CustomerListContainer = ({ onCardClick }) => {
	const dispatch = useDispatch();
	const user_role = useSelector(selectUserRole);
	const { isLoading, error } = useSelector(selectAllCustomers);
	const customers = useSelector(filteredCustomers);
	useEffect(() => {
		dispatch(getCustomersAsync());
		dispatch(setListViewFilter({ filter: '' }));
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
					{user_role !== 'Distribution Officer' && (
						<HStack>
							<Spacer />
							<LoyaltySchema />
						</HStack>
					)}
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
