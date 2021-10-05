/**
 * Summary.
 * Persentation of ditribution officers list view
 *
 * Description.
 *
 * @file   This files defines the do's list view
 * @author Hirumal Priyashan.
 * @since  20.09.2021
 */

import React, { useEffect } from 'react';
import {
	Alert,
	AlertIcon,
	AlertDescription,
	Collapse,
	useDisclosure,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../common/SearchBar';
import { getDistributionOfficersAsync } from '../../../redux/slices/distributionOfficersSlice';
import DOCard from '../../presentation/distribution-officer/DOCard';
import LoadingCards from '../../common/loading/LoadingCards';
import ErrorOverlay from '../../common/error-overlays/ErrorOverlay';
import {
	selectFilteredDistributionOfficers,
	selectDistributionOfficers,
	setListViewFilter,
} from '../../../redux/slices/distributionOfficersSlice';
import { selectUserRole } from '../../../redux/slices/userSlice';

const DOListContainer = (props) => {
	const dispatch = useDispatch();
	const { isOpen, onToggle } = useDisclosure();
	const { isLoading, error } = useSelector(selectDistributionOfficers);
	const user_role = useSelector(selectUserRole);
	const distributionOfficers = useSelector(selectFilteredDistributionOfficers);
	useEffect(() => {
		dispatch(getDistributionOfficersAsync());
	}, [dispatch]);
	const onChange = (word) => {
		dispatch(setListViewFilter({ filter: word }));
	};
	return (
		<div>
			{
				<>
					<SearchBar
						placeholder={'Search distribution officers.........'}
						onChange={onChange}
					/>
					{isLoading && <LoadingCards count={3} />}
					{error !== '' && <ErrorOverlay error={error} />}
					{!isLoading &&
						user_role !== 'Distribution Officer' &&
						distributionOfficers.filter(
							(dOfficer) => dOfficer.is_approved === false
						).length > 0 && (
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
									{distributionOfficers
										.filter((sp) => sp.is_approved === false)
										.map((dOfficer, index) => (
											<DOCard key={index} dOfficer={dOfficer} />
										))}
								</Collapse>
							</>
						)}
					{!isLoading &&
						distributionOfficers
							.filter((dOfficer) => dOfficer.is_approved !== false)
							.map((dOfficer, index) => (
								<DOCard key={index} dOfficer={dOfficer} />
							))}
				</>
			}
		</div>
	);
};

DOListContainer.propTypes = {};

export default DOListContainer;
