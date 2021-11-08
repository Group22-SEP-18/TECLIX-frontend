/**
 * Summary.
 * Persentation of Dashboard
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines dashboard.
 * @author Hirumal Priyashan.
 * @since  07.09.2021
 */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import LeaderBoardContainer from '../../containers/leaderboard/LeaderBoardContainer';
import SideBar from '../../common/sidebar/SideBar';
import CurrentLocationsContainer from '../../containers/dashboard/CurrentLocationsContainer';
import SingleSalespersonView from '../../containers/salesperson/SingleSalespersonView';
import {
	selectAllSalespersons,
	getSalespersonsAsync,
} from '../../../redux/slices/salespersonSlice';

const DashBorad = (props) => {
	const dispatch = useDispatch();
	const [singleSalesPersonView, setSingleSalesPersonView] = useState({
		view: false,
		salesperson: null,
	});
	const { salespersons } = useSelector(selectAllSalespersons);
	const onMarkerClick = (sp_id) => {
		const salesperson = salespersons.find((sp) => sp.id === sp_id);
		setSingleSalesPersonView({
			view: true,
			salesperson: salesperson,
		});
	};
	const onBackClick = () => {
		setSingleSalesPersonView({
			view: false,
			salesperson: null,
		});
	};
	useEffect(() => {
		dispatch(getSalespersonsAsync());
	}, [dispatch]);
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<div>
					{!singleSalesPersonView.view && (
						<Grid
							h='calc(100vh - 120px)'
							templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
							overflowY={{ base: 'scroll' }}
							gap={4}
						>
							<GridItem id='dashboard-map-wrapper' colSpan={{ base: 2, xl: 2 }}>
								<Box
									maxW='100%'
									maxH='100%'
									borderWidth='1px'
									borderRadius='xl'
									overflow='hidden'
								>
									<CurrentLocationsContainer onClick={onMarkerClick} />
								</Box>
							</GridItem>
							<GridItem colSpan={{ base: 2, xl: 1 }}>
								<LeaderBoardContainer depth={9} />
							</GridItem>
						</Grid>
					)}

					{singleSalesPersonView.view &&
						singleSalesPersonView.salesperson !== null && (
							<SingleSalespersonView
								salesperson={singleSalesPersonView.salesperson}
								onClick={onBackClick}
							/>
						)}
				</div>
			</Box>
		</Box>
	);
};

DashBorad.propTypes = {};

export default DashBorad;
