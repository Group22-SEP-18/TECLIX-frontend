import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';

const SalespersonReportPage = (props) => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<Tabs variant='soft-rounded' colorScheme='green'>
					<TabList>
						<Tab>Sales For Current Month</Tab>
						<Tab>Compare Progress</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>one!</p>
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
};

SalespersonReportPage.propTypes = {};

export default SalespersonReportPage;
