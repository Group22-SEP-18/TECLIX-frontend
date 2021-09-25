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
import {
	Alert,
	AlertIcon,
	AlertDescription,
	Collapse,
	useDisclosure,
} from '@chakra-ui/react';
import SearchBar from '../../common/SearchBar';
import SalesPersonCard from '../../presentation/salesperson/SalesPersonCard';
import { getSalespersons } from '../../../redux/actions/salespersonActions';

const SalesPersonsContainer = ({ onCardClick }) => {
	const { isOpen, onToggle } = useDisclosure();
	const dispatch = useDispatch();
	const { isLoading, salespersons, error } = useSelector(
		(state) => state.salespersons
	);
	const user_role = useSelector((state) => state.user.user.user_role);
	useEffect(() => {
		dispatch(getSalespersons());
	}, [dispatch]);

	return (
		<div>
			{
				<>
					<SearchBar placeholder={'Search salespersons.........'} />
					{user_role === 'Distribution Officer' &&
						salespersons.filter((sp) => sp.is_approved === false).length >
							0 && (
							<>
								<Alert
									my={4}
									status='info'
									onClick={onToggle}
									borderRadius='lg'
									_hover={{ cursor: 'pointer' }}
								>
									<AlertIcon />
									<AlertDescription>
										New Accounts need to be approved
									</AlertDescription>
								</Alert>
								<Collapse in={isOpen} animateOpacity>
									{salespersons
										.filter((sp) => sp.is_approved === false)
										.map((salesperson, index) => (
											<SalesPersonCard
												key={index}
												salesperson={salesperson}
												onClick={onCardClick}
											/>
										))}
								</Collapse>
							</>
						)}

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
