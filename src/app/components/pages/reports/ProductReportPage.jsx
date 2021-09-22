import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';

const ProductReportPage = (props) => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<Tabs variant='soft-rounded' colorScheme='green'>
					<TabList>
						<Tab>Sales Per Product</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>one!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Box>
	);
};

ProductReportPage.propTypes = {};

export default ProductReportPage;
