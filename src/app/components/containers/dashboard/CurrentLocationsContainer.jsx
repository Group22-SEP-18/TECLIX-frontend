/**
 * Summary.
 * Persentation of current locations of salespersons
 *
 * Description.
 *
 * @file   This files defines the map view for current locations of salespersons
 * @author Hirumal Priyashan.
 * @since  20.09.2021
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchCurrentLocationsAsync,
	selectAllCurrentLocations,
} from '../../../redux/slices/currentLocationsSlice';
import MapWithHeader from '../../common/map/MapWithHeader';
import LoadingSkelton from '../../common/loading/LoadingSkelton';
import ErrorOverlay from '../../common/error-overlays/ErrorOverlay';
import PopupMarker from '../../common/map/PopupMarker';
import { capitalizeFirstLetter } from '../../../utils';

const CurrentLocationsContainer = ({ onClick }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCurrentLocationsAsync());
	}, [dispatch]);
	const { currentLocations, isLoading, error } = useSelector(
		selectAllCurrentLocations
	);
	if (isLoading) return <LoadingSkelton />;
	if (error) return <ErrorOverlay error={error} />;
	const locations = currentLocations.map((l) => ({
		latitude: parseFloat(l.customer.latitude),
		longitude: parseFloat(l.customer.longitude),
		name: `${capitalizeFirstLetter(
			l.salesperson.first_name
		)} ${capitalizeFirstLetter(l.salesperson.last_name)}`,
		profile_picture: l.salesperson.profile_picture,
		sp_id: l.salesperson.id,
		address: `${capitalizeFirstLetter(
			l.customer.street
		)}, ${capitalizeFirstLetter(l.customer.city)}`,
	}));
	return (
		<MapWithHeader
			header=''
			locations={locations}
			Component={PopupMarker}
			centr={{ latitude: 7.2496879218081824, longitude: 80.37392000462803 }}
			onClick={onClick}
		/>
	);
};

CurrentLocationsContainer.propTypes = {};

export default CurrentLocationsContainer;
