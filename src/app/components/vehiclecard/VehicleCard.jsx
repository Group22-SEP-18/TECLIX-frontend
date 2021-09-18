import {
	Flex,
	Box,
	Image,
	useColorModeValue,
	Button,
	Divider,
	Stack,
} from '@chakra-ui/react';
import { MdBuild, MdDelete } from 'react-icons/md';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { Tag, TagLabel } from '@chakra-ui/react';
import { StackDivider, VStack } from '@chakra-ui/react';
//import Axios from 'axios';

function ProductCard(props) {
	//const toast = useToast();

	const updateDetails = (ProductDetails) => {
		// Axios.update('http://localhost:5000/xxxxxxx', {
		// 	ProductDetails: ProductDetails,
		// })
		// 	.then((Response) => {
		// 		if (Response.data.success === true) {
		// 			var card_id = Response.data.insertId;
		// 			var newCard = { card_id, ...CardDetails };
		// 			setBankCards([...bankCards, newCard]);
		// 			toast({
		// 				position: 'bottom-right',
		// 				description: 'Product details updated successfully',
		// 				status: 'success',
		// 				duration: 5000,
		// 				isClosable: true,
		// 			});
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		toast({
		// 			position: 'bottom-right',
		// 			description: 'Internal Server Error. Try again later',
		// 			status: 'error',
		// 			duration: 5000,
		// 			isClosable: true,
		// 		});
		// 	});
	};
	const deleteItem = (id) => {
		// Axios.delete('http://localhost:5000/xxxxx', {
		// 	data: { id: id },
		// })
		// 	.then((Response) => {
		// 		// console.log(Response);
		// 		setBankCards(
		// 			bankCards.filter((bankCard) => bankCard.card_id !== card_id)
		// 		);
		// 		toast({
		// 			position: 'bottom-right',
		// 			description: 'Product deleted successfully',
		// 			status: 'error',
		// 			duration: 5000,
		// 			isClosable: true,
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		toast({
		// 			position: 'bottom-right',
		// 			description: 'Internal Server Error. Try again later',
		// 			status: 'error',
		// 			duration: 5000,
		// 			isClosable: true,
		// 		});
		// 	});
	};

	return (
		<Flex p={25} w='full' alignItems='center' justifyContent='center'>
			<Box
				bg={useColorModeValue('white', 'gray.800')}
				maxW='xs'
				borderWidth='1px'
				rounded='lg'
				shadow='lg'
				_hover={{ bg: 'gray.200' }}
				position='relative'
			>
				<Image
					src={props.image_url}
					alt={`Picture of ${props.vehicle_type}`}
					roundedTop='lg'
				/>

				<Box p='2' maxHeight='40'>
					<Stat>
						<StatLabel>{props.vehicle_model}</StatLabel>
						<StatNumber>{props.vehicle_type}</StatNumber>
						<StatHelpText>{props.vehicle_id}</StatHelpText>
					</Stat>
				</Box>
				<Divider size='30' pt='1' />
				<VStack
					divider={<StackDivider borderColor='gray.200' />}
					spacing={4}
					align='stretch'
				>
					<Box>
						<Wrap pt='3' pl='1'>
							<WrapItem>
								<Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
									<TagLabel pr='2' color='blue.700'>
										12x
									</TagLabel>
									<Avatar
										src='/1234.jpg'
										size='xs'
										name='Segun Adebayo'
										ml={-1}
										mr={2}
									/>
									<TagLabel>Tikiri Marie Large</TagLabel>
								</Tag>
							</WrapItem>
							<WrapItem>
								<Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
									<TagLabel pr='2' color='blue.700'>
										4x
									</TagLabel>
									<Avatar
										src='/1234.jpg'
										size='xs'
										name='Segun Adebayo'
										ml={-1}
										mr={2}
									/>
									<TagLabel>Chips</TagLabel>
								</Tag>
							</WrapItem>
							<WrapItem>
								<Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
									<TagLabel pr='2' color='blue.700'>
										3x
									</TagLabel>
									<Avatar
										src='/1234.jpg'
										size='xs'
										name='Segun Adebayo'
										ml={-1}
										mr={2}
									/>
									<TagLabel>Cracker</TagLabel>
								</Tag>
							</WrapItem>
							<WrapItem>
								<Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
									<TagLabel pr='2' color='blue.700'>
										1x
									</TagLabel>
									<Avatar
										src='/1234.jpg'
										size='xs'
										name='Segun Adebayo'
										ml={-1}
										mr={2}
									/>
									<TagLabel>Chocolate Biscuit</TagLabel>
								</Tag>
							</WrapItem>
							<WrapItem>
								<Tag size='lg' colorScheme='whatsapp' borderRadius='full'>
									<TagLabel pr='2' color='blue.700'>
										8x
									</TagLabel>
									<Avatar
										src='/1234.jpg'
										size='xs'
										name='Segun Adebayo'
										ml={-1}
										mr={2}
									/>
									<TagLabel>Hawain Cookies</TagLabel>
								</Tag>
							</WrapItem>
						</Wrap>
					</Box>
					<Box pb='3' pl='1'>
						<Wrap>
							<WrapItem>
								<Tag size='lg' colorScheme='red' borderRadius='full'>
									<Avatar
										src='https://bit.ly/sage-adebayo'
										size='xs'
										name='Segun Adebayo'
										ml={-1}
										mr={2}
									/>
									<TagLabel>Peter Paul</TagLabel>
								</Tag>
							</WrapItem>
						</Wrap>
					</Box>
				</VStack>
				<Divider size='30' />
				<Stack direction='row' spacing={4} p='2'>
					<Button
						leftIcon={<MdBuild />}
						colorScheme='pink'
						variant='solid'
						minWidth='100'
						left='1'
					>
						Assignments
					</Button>
					<Button
						rightIcon={<MdDelete />}
						colorScheme='blue'
						variant='outline'
						minWidth='110'
						right='4xl'
					>
						Delete
					</Button>
				</Stack>
			</Box>
		</Flex>
	);
}

export default ProductCard;
