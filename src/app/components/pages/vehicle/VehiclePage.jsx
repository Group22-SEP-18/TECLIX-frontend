import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';
import AssignedVehicles from '../../presentation/vehicle/Assigned Vehicles/AssignedVehicles';
import UnAssignedVehicles from '../../presentation/vehicle/Unassigned Vehicles/UnAssignedVehicles';

const VehiclePage = () => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
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
