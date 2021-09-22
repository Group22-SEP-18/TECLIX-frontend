import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';

const SalesReportPage = (props) => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<Tabs variant='soft-rounded' colorScheme='green'>
					<TabList>
						<Tab>Total Sales</Tab>
						<Tab>Payments And Pay Later Comparisson</Tab>
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

SalesReportPage.propTypes = {};

export default SalesReportPage;
