import { WrapItem } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Tag, TagLabel } from '@chakra-ui/react';

function VehicleSalesperson(props) {
	return (
		<WrapItem>
			<Tag size='lg' colorScheme='red' borderRadius='full'>
				<Avatar
					src={props.image_url}
					size='xs'
					name='Segun Adebayo'
					ml={-1}
					mr={2}
				/>
				<TagLabel>{props.first_name}</TagLabel>
			</Tag>
		</WrapItem>
	);
}
export default VehicleSalesperson;
