import { WrapItem } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Tag, TagLabel } from '@chakra-ui/react';
import { capitalize } from 'lodash';

function VehicleSalesperson(props) {
	if (!props.first_name) {
		return null;
	}
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
				<TagLabel id='name'>
					{capitalize(props.first_name)} {capitalize(props.last_name)}
				</TagLabel>
			</Tag>
		</WrapItem>
	);
}
export default VehicleSalesperson;
