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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import VehicleProducts from './VehicleProducts';
import VehicleSalesperson from './VehicleSalesperson';
import VehicleAssignForm from './VehicleAssignForm';
import { fetchVehicleAssignData } from '../../../redux/actions/vehicleActions';

function VehicleCard(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVehicleAssignData(props.id));
	}, [dispatch]);
	const { vehiclesAssignments, isLoading, error } = useSelector(
		(state) => state.vehiclesAssignments
	);

	const array = props.assigned_products.map((p) => ({
		id: p.product.id,
		quantity: p.quantity,
	}));

	const updateDetails = (ProductDetails) => {
		// Axios.update('http://localhost:5000/xxxxxxx', {
	};
	const deleteItem = (id) => {
		// Axios.delete('http://localhost:5000/xxxxx', {
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
					src={props.vehicle_image}
					alt={`Picture of ${props.vehicle_type}`}
					roundedTop='lg'
				/>

				<Box p='2' maxHeight='40'>
					<Stat>
						<StatLabel>{props.vehicle_model}</StatLabel>
						<StatNumber>{props.vehicle_type}</StatNumber>
						<StatHelpText>ID: {props.id}</StatHelpText>
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
									product_imageURL={product.product.product_image}
									product_shortname={product.product.short_name}
									product_quantity={product.quantity}
								/>
							))}
						</Wrap>
					</Box>
					<Box pb='3' pl='1'>
						<Wrap>
							{props.salesperson.map((salesperson, index) => (
								<VehicleSalesperson
									key={index}
									image_url={salesperson.profile_picture}
									first_name={salesperson.first_name}
									last_name={salesperson.last_name}
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
										array={array}
										vehicleid={props.id}
										assignedsalesprson={props.salesperson}
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

export default VehicleCard;
