/**
 * Summary.
 * Persentation of SalesPersons List View
 *
 * Description.
 *
 * @file   This files defines the SalesPersons List View.
 * @author Hirumal Priyashan.
 * @since  09.09.2021
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../common/SearchBar';
import {
	getSalespersonsAsync,
	selectAllSalespersons,
} from '../../../redux/slices/salespersonSlice';
import SalesPersonCard from '../../presentation/salesperson/SalesPersonCard';
import { getSalespersons } from '../../../redux/actions/salespersonActions';

const SalesPersonsContainer = ({ onCardClick }) => {
	const dispatch = useDispatch();
	const { isLoading, salespersons, error } = useSelector(
		(state) => state.salespersons
	);
	console.log(salespersons);
	useEffect(() => {
		dispatch(getSalespersons());
	}, [dispatch]);

	return (
		<div>
			{
				<>
					<SearchBar placeholder={'Search salespersons.........'} />
					{/* TODO: use chakra transitions for pending approvals */}
					{salespersons
						.filter((sp) => sp.is_approved !== false)
						.map((salesperson, index) => (
							<SalesPersonCard
								key={index}
								salesperson={salesperson}
								onClick={onCardClick}
							/>
						))}
				</>
			}
		</div>
	);
};

SalesPersonsContainer.propTypes = {
	onCardClick: PropTypes.func,
};

export default SalesPersonsContainer;
