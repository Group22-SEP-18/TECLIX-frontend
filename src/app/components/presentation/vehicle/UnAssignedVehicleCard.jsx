import {
	Flex,
	Box,
	Image,
	useToast,
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
	ModalFooter,
	Stack,
} from '@chakra-ui/react';
import { MdBuild, MdDelete } from 'react-icons/md';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { vehicleDelete } from '../../../redux/actions/vehicleActions';
// import VehicleAssignForm from './VehicleAssignForm';

function UnAssignedVehicleCard(props) {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const deletevehicle = useSelector((state) => state.vehicles.deletevehicle);
	var [updateConstant, setupdateConstant] = useState(0);
	const dispatch = useDispatch();
	var toast_type2 = (success) =>
		toast({
			position: 'bottom-right',
			title: success ? 'Success' : 'Failed',
			status: success ? 'success' : 'error',
			duration: 5000,
			isClosable: true,
		});
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();
	const deleteVehicle = () => {
		dispatch(vehicleDelete(props.id));
		setupdateConstant((count) => count + 1);
	};
	if (updateConstant === 1 && !deletevehicle.isLoading) {
		toast_type2(deletevehicle.success);
		setupdateConstant((count) => count - 1);
		onCloseReportModal();
	}

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
									{/* <VehicleAssignFormForUnAssigned
										vehicleid={props.id}
										unassignedSalespersons={props.unassignedSalespersons}
										products={props.products}
										trigger={onClose}
									/> */}
								</ModalBody>
							</ModalContent>
						</Modal>
					</Box>
					<Box>
						<Button
							leftIcon={<MdDelete />}
							onClick={onOpenReportModal}
							colorScheme='pink'
							variant='solid'
							minWidth='100'
							left='1'
						>
							Delete
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
								<ModalHeader>Do you want to delete this product?</ModalHeader>
								<ModalCloseButton />
								<ModalBody pb='5'></ModalBody>
								<ModalFooter>
									<Button
										colorScheme='whatsapp'
										mr={3}
										minWidth='200'
										onClick={deleteVehicle}
										isLoading={deletevehicle.isLoading}
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

export default UnAssignedVehicleCard;
