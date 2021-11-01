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
import LoadingCards from '../../common/loading/LoadingCards';
import ErrorOverlay from '../../common/error-overlays/ErrorOverlay';
import {
	selectAllSalespersons,
	selectFilteredSalespersons,
	setListViewFilter,
	getSalespersonsAsync,
} from '../../../redux/slices/salespersonSlice';
import { selectLeaderboard } from '../../../redux/slices/leaderboardSlice';
import { selectUserRole } from '../../../redux/slices/userSlice';

const SalesPersonsContainer = ({ onCardClick }) => {
	const { isOpen, onToggle } = useDisclosure();
	const dispatch = useDispatch();
	const { isLoading, error } = useSelector(selectAllSalespersons);
	const user_role = useSelector(selectUserRole);
	const salespersons = useSelector(selectFilteredSalespersons);
	const { todayLeaderboard } = useSelector(selectLeaderboard);
	useEffect(() => {
		dispatch(getSalespersonsAsync());
	}, [dispatch]);
	const onChange = (word) => {
		dispatch(setListViewFilter({ filter: word }));
	};
	return (
		<div>
			{
				<>
					<SearchBar
						placeholder={'Search salespersons.........'}
						onChange={onChange}
					/>
					{isLoading && <LoadingCards count={3} />}
					{error !== '' && <ErrorOverlay error={error} />}
					{!isLoading &&
						user_role === 'Distribution Officer' &&
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
												leaderboard={todayLeaderboard}
											/>
										))}
								</Collapse>
							</>
						)}

					{!isLoading &&
						salespersons
							.filter((sp) => sp.is_approved !== false)
							.map((salesperson, index) => (
								<SalesPersonCard
									key={index}
									salesperson={salesperson}
									onClick={onCardClick}
									leaderboard={todayLeaderboard}
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
