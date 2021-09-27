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
import { fetchCurrentLocationData } from '../../../redux/actions/currentLocationsActions';
import MapWithHeader from '../../common/map/MapWithHeader';
import LoadingSkelton from '../../common/loading/LoadingSkelton';
import ErrorOverlay from '../../common/error-overlays/ErrorOverlay';

const CurrentLocationsContainer = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentLocationData());
	}, [dispatch]);
	const { currentLocations, isLoading, error } = useSelector(
		(state) => state.currentLocations
	);
	if (isLoading) return <LoadingSkelton />;
	if (error) return <ErrorOverlay error={error} />;
	const locations = currentLocations.map((l) => ({
		latitude: parseFloat(l.customer.latitude),
		longitude: parseFloat(l.customer.longitude),
	}));
	return <MapWithHeader header='' locations={locations} />;
};

CurrentLocationsContainer.propTypes = {};

export default CurrentLocationsContainer;
