import { WrapItem } from '@chakra-ui/react';
import React from 'react';
import { Avatar } from '@chakra-ui/react';
import { Tag, TagLabel } from '@chakra-ui/react';

function VehicleProducts(props) {
	return (
		<div key={props.key}>
			<WrapItem>
				<Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
					<TagLabel pr='2' color='blue.700'>
						{props.product_quantity}x
					</TagLabel>
					<Avatar
						src={props.product_imageURL}
						size='xs'
						name='Segun Adebayo'
						ml={-1}
						mr={2}
					/>
					<TagLabel>{props.product_shortname}</TagLabel>
				</Tag>
			</WrapItem>
		</div>
	);
}

export default VehicleProducts;
