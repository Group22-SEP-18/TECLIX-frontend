import React from 'react';
import {
	Box,
	Tabs,
	TabList,
	TabPanels,
	useDisclosure,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalHeader,
	Tab,
	TabPanel,
} from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';
import AssignedVehicles from '../../presentation/vehicle/Assigned Vehicles/AssignedVehicles';
import UnAssignedVehicles from '../../presentation/vehicle/Unassigned Vehicles/UnAssignedVehicles';
import AddNewVehicle from '../../presentation/vehicle/AddNewVehicle';

const VehiclePage = () => {
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<Box pr='12' style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button colorScheme='whatsapp' onClick={onOpenReportModal} size='lg'>
						Add a vehicle
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
							<ModalHeader>Register A New Vehicle</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb='5'>
								<AddNewVehicle trigger={onCloseReportModal} />
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
				<Tabs variant='soft-rounded' colorScheme='green'>
					<TabList>
						<Tab>Assigned Vehicles</Tab>
						<Tab>Unassigned Vehicles</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<AssignedVehicles />
						</TabPanel>
						<TabPanel>
							<UnAssignedVehicles />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
};

VehiclePage.propTypes = {};

export default VehiclePage;
