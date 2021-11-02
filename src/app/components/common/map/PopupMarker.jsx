/**
 * Summary.
 * Persentation of marker with the popup on hover
 *
 * Description.
 *
 * @file   This files defines the marker with the popup on hover.
 * @author Hirumal Priyashan.
 * @since  31.10.2021
 */

import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Avatar, HStack, Text } from '@chakra-ui/react';

const HoverText = ({ info }) => {
	return (
		<>
			<HStack>
				<Avatar size='sm' name={info.name} src={info.profile_picture} />{' '}
				<Text fontSize='md'>{info.name}</Text>
			</HStack>
			<Text fontSize='md'>{info.address}</Text>
		</>
	);
};

const PopupMarker = ({ position, info, onClick }) => {
	const [isHovering, setIsHovering] = useState(false);
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};
	return (
		<Marker
			position={position}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
			onClick={() => onClick(info.sp_id)}
		>
			{isHovering && (
				<InfoWindow>
					<HoverText info={info} />
				</InfoWindow>
			)}
		</Marker>
	);
};

export default PopupMarker;
