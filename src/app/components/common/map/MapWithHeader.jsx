import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import { Marker } from 'react-google-maps';
import SimpleMap from './SimpleMap';

const MapWithHeader = ({ header, locations }) => {
	const center = locations[0];
	const markers = locations.map((loc, index) => (
		<Marker key={index} position={{ lat: loc.latitude, lng: loc.longitude }} />
	));
	return (
		<div>
			<Text fontWeight={500} color={'gray.500'} my={4} textAlign='start' pl='4'>
				{header}
			</Text>
			<Box
				maxW='100%'
				maxH='100%'
				borderWidth='1px'
				borderRadius='xl'
				overflow='hidden'
			>
				<SimpleMap center={center} markers={markers} />
			</Box>
		</div>
	);
};

MapWithHeader.propTypes = {
	header: PropTypes.string,
	locations: PropTypes.array,
};

export default MapWithHeader;
