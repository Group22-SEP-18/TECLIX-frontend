import {
	Flex,
	Box,
	Image,
	Button,
	Divider,
	Modal,
	useDisclosure,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalFooter,
	ModalCloseButton,
	ModalHeader,
	Stack,
} from '@chakra-ui/react';
import { MdBuild } from 'react-icons/md';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VStack, StackDivider } from '@chakra-ui/react';
import { Wrap } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import VehicleProducts from '../VehicleProducts';
import VehicleSalesperson from '../VehicleSalesperson';
import VehicleAssignForm from '../Assigned Vehicles/VehicleAssignForm';
import { vehicleUnassign } from '../../../../redux/actions/vehicleActions';

function VehicleCard(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();

	const dispatch = useDispatch();
	const unassign = useSelector((state) => state.vehiclesAssignments.unassign);

	const UnassignVehicle = () => {
		dispatch(vehicleUnassign(props.rowid));
	};

	if (!props.id) {
		return null;
	}

	const array = props.assigned_products.map((p) => ({
		product: p.product.id,
		quantity: p.quantity,
	}));

	return (
		<Flex p={25} w='full' alignItems='center' justifyContent='center'>
			<Box
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
						<StatLabel id='vehicle-model-number'>
							{props.vehicle_model} {props.vehicle_number}
						</StatLabel>
						<StatNumber id='vehicle-type'>{props.vehicle_type}</StatNumber>
						<StatHelpText id='vehicle-id'>ID: {props.id}</StatHelpText>
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
							minWidth='100'
							left='1'
						>
							Assign
						</Button>
						<Modal
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
										rowid={props.rowid}
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
					<Box>
						<Button
							leftIcon={<MdBuild />}
							onClick={onOpenReportModal}
							colorScheme='red'
							variant='solid'
							minWidth='100'
							left='1'
						>
							Unassign
						</Button>
						<Modal
							closeOnOverlayClick={false}
							onClose={onCloseReportModal}
							isOpen={isOpenReportModal}
							motionPreset='scale'
							isCentered
						>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>Do you want to unassign the vehicle?</ModalHeader>
								<ModalCloseButton />
								<ModalBody pb='5'></ModalBody>
								<ModalFooter>
									<Button
										colorScheme='whatsapp'
										mr={3}
										minWidth='200'
										onClick={UnassignVehicle}
										isLoading={unassign.isLoading}
									>
										Yes
									</Button>
									<Button onClick={onCloseReportModal} minWidth='200'>
										No
									</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</Box>
				</Stack>
			</Box>
		</Flex>
	);
}

export default VehicleCard;
