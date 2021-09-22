import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import SideBar from '../../common/sidebar/SideBar';

const SalesReportPage = (props) => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<div>SalesReportPage</div>
			</Box>
		</Box>
	);
};

SalesReportPage.propTypes = {};

export default SalesReportPage;
