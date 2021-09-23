/**
 * Summary.
 * Persentation of distribution officers page
 *
 * Description.
 *
 * @file   This files defines the dos page
 * @author Hirumal Priyashan.
 * @since  20.09.2021
 */

import React from 'react';
import { Box } from '@chakra-ui/react';
import DOListContainer from '../../containers/do-containers/DOListContainer';
import SideBar from '../../common/sidebar/SideBar';

const OfficersPage = (props) => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<DOListContainer />
			</Box>
		</Box>
	);
};

OfficersPage.propTypes = {};

export default OfficersPage;
