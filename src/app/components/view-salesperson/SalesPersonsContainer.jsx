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
import SearchBar from '../common/SearchBar';
import {
	getSalespersonsAsync,
	selectAllSalespersons,
} from '../../redux/slices/salespersonSlice';
import SalesPersonCard from './SalesPersonCard';

const SalesPersonsContainer = ({ onCardClick }) => {
	const dispatch = useDispatch();
	const salespersons = useSelector(selectAllSalespersons);
	useEffect(() => {
		dispatch(getSalespersonsAsync());
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
								salesperson={salesperson}
								key={index}
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
