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

import React, { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import LeaderBoardContainer from '../leaderboard/dashboard-leaderboard/LeaderBoardContainer';
import SalesPersonsContainer from './SalesPersonsContainer';
import SingleSalespersonView from './SingleSalespersonView';

const SalesPersonViewMainPage = (props) => {
	const [singleSalesPersonView, setSingleSalesPersonView] = useState({
		view: false,
		salesperson: null,
	});
	const onCardClick = (salesperson) => {
		setSingleSalesPersonView({
			view: true,
			salesperson: salesperson,
		});
	};
	const onCardCloseClick = () => {
		setSingleSalesPersonView({
			view: false,
			salesperson: null,
		});
	};
	return (
		<div>
			{!singleSalesPersonView.view && (
				<>
					<Grid
						templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(5, 1fr)' }}
						gap={4}
					>
						<GridItem colSpan={{ base: 1, lg: 3 }}>
							<SalesPersonsContainer onCardClick={onCardClick} />
						</GridItem>
						<GridItem colSpan={{ base: 1, lg: 2 }}>
							<LeaderBoardContainer />
						</GridItem>
					</Grid>
				</>
			)}

			{singleSalesPersonView.view &&
				singleSalesPersonView.salesperson !== null && (
					<SingleSalespersonView
						salesperson={singleSalesPersonView.salesperson}
						onClick={onCardCloseClick}
					/>
				)}
		</div>
	);
};

SalesPersonViewMainPage.propTypes = {};

export default SalesPersonViewMainPage;
