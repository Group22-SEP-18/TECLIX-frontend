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
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
// import VehicleAssignForm from './VehicleAssignForm';

function UnAssignedVehicleCard(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
							colorScheme='pink'
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
				</Stack>
			</Box>
		</Flex>
	);
}

export default UnAssignedVehicleCard;
