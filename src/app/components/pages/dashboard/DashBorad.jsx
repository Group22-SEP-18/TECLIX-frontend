import React from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import LeaderBoardContainer from '../../containers/leaderboard/LeaderBoardContainer';
import SideBar from '../../common/sidebar/SideBar';
import CurrentLocationsContainer from '../../containers/dashboard/CurrentLocationsContainer';

const DashBorad = (props) => {
	return (
		<Box minH='100vh'>
			<SideBar />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<Grid
					h='calc(100vh - 120px)'
					templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
					overflowY={{ base: 'scroll', xl: 'hidden' }}
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
							<CurrentLocationsContainer />
						</Box>
					</GridItem>
					<GridItem colSpan={{ base: 2, xl: 1 }}>
						<LeaderBoardContainer />
					</GridItem>
				</Grid>
			</Box>
		</Box>
	);
};

DashBorad.propTypes = {};

export default DashBorad;
