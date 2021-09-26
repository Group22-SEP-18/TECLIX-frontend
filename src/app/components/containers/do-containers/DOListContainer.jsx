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
import { getDistributionOfficers } from '../../../redux/actions/doActions';
import DOCard from '../../presentation/distribution-officer/DOCard';
import LoadingCards from '../../common/loading/LoadingCards';
import ErrorOverlay from '../../common/error-overlays/ErrorOverlay';

const DOListContainer = (props) => {
	const dispatch = useDispatch();
	const { isOpen, onToggle } = useDisclosure();
	const { isLoading, distributionOfficers, error } = useSelector(
		(state) => state.distributionOfficers
	);
	const user_role = useSelector((state) => state.user.user.user_role);
	useEffect(() => {
		dispatch(getDistributionOfficers());
	}, [dispatch]);
	return (
		<div>
			{
				<>
					<SearchBar placeholder={'Search distribution officers.........'} />
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
