import React, { memo, useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import LoadingSkelton from '../loading/LoadingSkelton';

const SimpleMap = ({
	markers,
	height,
	center = { latitude: 6.8696358044539165, longitude: 79.88899961877866 },
}) => {
	const containerStyle = {
		height: height || '800px',
	};
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
	});

	const [, setMap] = useState(null);

	const onLoad = useCallback((map) => {
		// const bounds = new window.google.maps.LatLngBounds();
		// map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={{ lat: center.latitude, lng: center.longitude }}
			zoom={8}
			onLoad={onLoad}
			onUnmount={onUnmount}
		>
			{markers.map((marker) => marker)}
		</GoogleMap>
	) : (
		<LoadingSkelton />
	);
};

export default memo(SimpleMap);
