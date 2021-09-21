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

const CurrentLocationsContainer = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentLocationData());
	}, [dispatch]);
	const { currentLocations, isLoading, error } = useSelector(
		(state) => state.currentLocations
	);
	if (isLoading) return <h3>Loading ...</h3>;
	if (error) return <h3>{error}</h3>;
	const locations = currentLocations.map((l) => ({
		latitude: parseFloat(l.customer.latitude),
		longitude: parseFloat(l.customer.longitude),
	}));
	return <MapWithHeader header='' locations={locations} />;
};

CurrentLocationsContainer.propTypes = {};

export default CurrentLocationsContainer;
