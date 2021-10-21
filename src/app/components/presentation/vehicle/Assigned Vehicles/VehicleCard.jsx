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
import { MdBuild } from 'react-icons/md';
import React from 'react';
import { VStack, StackDivider } from '@chakra-ui/react';
import { Wrap } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import VehicleProducts from '../VehicleProducts';
import VehicleSalesperson from '../VehicleSalesperson';
import VehicleAssignForm from '../Assigned Vehicles/VehicleAssignForm';

function VehicleCard(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const array = props.assigned_products.map((p) => ({
		product: p.product.id,
		quantity: p.quantity,
	}));

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
						<StatLabel>
							{props.vehicle_model} {props.vehicle_number}
						</StatLabel>
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
							<VehicleSalesperson
								image_url={
									props.allsalespersons[
										props.allsalespersons.findIndex(
											(x) => x.id === props.salesperson
										)
									].profile_picture
								}
								first_name={
									props.allsalespersons[
										props.allsalespersons.findIndex(
											(x) => x.id === props.salesperson
										)
									].first_name
								}
								last_name={
									props.allsalespersons[
										props.allsalespersons.findIndex(
											(x) => x.id === props.salesperson
										)
									].last_name
								}
							/>
						</Wrap>
					</Box>
				</VStack>
				<Divider size='30' />
				<Stack direction='row' spacing={4} p='2'>
					<Box>
						<Button
							leftIcon={<MdBuild />}
							onClick={onOpen}
							colorScheme='facebook'
							variant='solid'
							minWidth='230'
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
										assignedsalesprsonEmpNo={
											props.allsalespersons[
												props.allsalespersons.findIndex(
													(x) => x.id === props.salesperson
												)
											].employee_no
										}
										assignedsalesprsonFirstName={
											props.allsalespersons[
												props.allsalespersons.findIndex(
													(x) => x.id === props.salesperson
												)
											].first_name
										}
										assignedsalesprsonLastName={
											props.allsalespersons[
												props.allsalespersons.findIndex(
													(x) => x.id === props.salesperson
												)
											].last_name
										}
										unassignedSalespersons={props.unassignedSalespersons}
										products={props.products}
										trigger={onClose}
									/>
								</ModalBody>
							</ModalContent>
						</Modal>
					</Box>
				</Stack>
			</Box>
		</Flex>
	);
}

export default VehicleCard;
