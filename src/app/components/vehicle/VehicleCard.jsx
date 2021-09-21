import {
	Flex,
	Box,
	Image,
	useColorModeValue,
	Button,
	Divider,
	Modal,
	useDisclosure,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalHeader,
	Stack,
} from '@chakra-ui/react';
import { MdBuild, MdDelete } from 'react-icons/md';
import { VStack, StackDivider } from '@chakra-ui/react';
import { Wrap } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import VehicleProducts from './VehicleProducts';
import VehicleSalesperson from './VehicleSalesperson';
import VehicleAssignForm from './VehicleAssignForm';
//import Axios from 'axios';

function ProductCard(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
							{props.assigned_products.map((product, index) => (
								<VehicleProducts
									key={index}
									product_imageURL={product.product_imageURL}
									product_shortname={product.product_shortname}
									product_quantity={product.product_quantity}
								/>
							))}
						</Wrap>
					</Box>
					<Box pb='3' pl='1'>
						<Wrap>
							{props.assigned_salesperson.map((salesperson, index) => (
								<VehicleSalesperson
									key={index}
									image_url={salesperson.image_url}
									first_name={salesperson.first_name}
								/>
							))}
						</Wrap>
					</Box>
				</VStack>
				<Divider size='30' />
				<Stack direction='row' spacing={4} p='2'>
					<Box>
						<Button
							leftIcon={<MdBuild />}
							onClick={onOpen}
							colorScheme='pink'
							variant='solid'
							minWidth='100'
							left='1'
						>
							Assignments
						</Button>
						<Modal
							closeOnOverlayClick={false}
							onClose={onClose}
							isOpen={isOpen}
							motionPreset='scale'
							isCentered
						>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Assign Products To The Vehicle</ModalHeader>
								<ModalCloseButton />
								<ModalBody pb='5'>
									<VehicleAssignForm
										updateDetails={updateDetails}
										trigger={onClose}
									/>
								</ModalBody>
							</ModalContent>
						</Modal>
					</Box>
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
