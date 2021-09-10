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
import SearchBar from '../common/SearchBar';
import {
	getSalespersonsAsync,
	selectAllSalespersons,
} from '../../redux/slices/salespersonSlice';
import SalesPersonCard from './SalesPersonCard';

const SalesPersonsContainer = (props) => {
	const dispatch = useDispatch();
	const salespersons = useSelector(selectAllSalespersons);
	useEffect(() => {
		dispatch(getSalespersonsAsync());
	}, [dispatch]);
	const [singleSalesPersonView, setSingleSalesPersonView] = useState({
		view: false,
		salesperson: null,
	});
	const onCardClick = (salesperson) => {
		setSingleSalesPersonView({
			view: true,
			salesperson: salesperson,
		});
	};
	const onCardCloseClick = () => {
		setSingleSalesPersonView({
			view: false,
			salesperson: null,
		});
	};
	return (
		<div>
			{!singleSalesPersonView.view && (
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
			)}
			{singleSalesPersonView.view &&
				singleSalesPersonView.salesperson !== null && (
					<SalesPersonCard
						salesperson={singleSalesPersonView.salesperson}
						onClick={onCardCloseClick}
					/>
				)}
		</div>
	);
};

SalesPersonsContainer.propTypes = {};

export default SalesPersonsContainer;
