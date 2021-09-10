/**
 * Summary.
 * Persentation of SalesPerson View Page
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines the sales person page.
 * @author Hirumal Priyashan.
 * @since  07.09.2021
 */

import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import LeaderBoardContainer from '../leaderboard/dashboard-leaderboard/LeaderBoardContainer';
import SalesPersonsContainer from './SalesPersonsContainer';

const SalesPersonViewMainPage = (props) => {
	return (
		<div>
			<Grid
				templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(5, 1fr)' }}
				gap={4}
			>
				<GridItem colSpan={{ base: 1, lg: 3 }}>
					<SalesPersonsContainer />
				</GridItem>
				<GridItem colSpan={{ base: 1, lg: 2 }}>
					<LeaderBoardContainer />
				</GridItem>
			</Grid>
		</div>
	);
};

SalesPersonViewMainPage.propTypes = {};

export default SalesPersonViewMainPage;
