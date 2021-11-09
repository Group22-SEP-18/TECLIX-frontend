import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import { Marker } from '@react-google-maps/api';
import SimpleMap from './SimpleMap';

const MapWithHeader = ({
	header = '',
	locations,
	height,
	Component = Marker,
	centr,
	onClick = () => {},
}) => {
	const center =
		locations.length > 0
			? {
					latitude: parseFloat(locations[0].latitude),
					longitude: parseFloat(locations[0].longitude),
			  }
			: centr || { latitude: 6.8696358044539165, longitude: 79.88899961877866 };
	const markers = locations.map((loc, index) => (
		<Component
			key={index}
			position={{
				lat: parseFloat(loc.latitude),
				lng: parseFloat(loc.longitude),
			}}
			info={{
				name: loc.name || '',
				profile_picture: loc.profile_picture || '',
				sp_id: loc.sp_id || null,
				address: loc.address || '',
			}}
			onClick={onClick}
		/>
	));
	return (
		<div>
			{header !== '' && (
				<Text
					fontWeight={500}
					color={'gray.500'}
					my={4}
					textAlign='start'
					pl='4'
				>
					{header}
				</Text>
			)}
			<Box
				maxW='100%'
				maxH='100%'
				borderWidth='1px'
				borderRadius='xl'
				overflow='hidden'
			>
				<SimpleMap center={center} markers={markers} height={height} />
			</Box>
		</div>
	);
};

MapWithHeader.propTypes = {
	header: PropTypes.string,
	locations: PropTypes.array.isRequired,
};

export default MapWithHeader;
