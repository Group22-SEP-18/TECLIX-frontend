import React from 'react';
import { Box } from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';

const ProductReportPage = (props) => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<div>SalesReportPage</div>
			</Box>
		</Box>
	);
};

ProductReportPage.propTypes = {};

export default ProductReportPage;
