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

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from '../common/SearchBar';
import { getSalespersonsAsync } from '../../redux/slices/salespersonSlice';
import SalesPersonCard from './SalesPersonCard';

const SalesPersonsContainer = (props) => {
	const dispatch = useDispatch();
	const salespersons = useSelector((state) => state.salespersons);
	useEffect(() => {
		dispatch(getSalespersonsAsync());
	}, [dispatch]);
	return (
		<div>
			<SearchBar placeholder={'Search salespersons.........'} />
			{/* TODO: use chakra transitions for pending approvals */}
			{salespersons
				.filter((sp) => sp.is_approved !== false)
				.map((salesperson, index) => (
					<SalesPersonCard salesperson={salesperson} key={index} />
				))}
		</div>
	);
};

SalesPersonsContainer.propTypes = {};

export default SalesPersonsContainer;
