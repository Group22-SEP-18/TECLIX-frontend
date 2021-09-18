import React from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import SimpleMap from '../common/map/SimpleMap';
import StatCard from '../stats/StatCard';
import LeaderBoardContainer from '../leaderboard/dashboard-leaderboard/LeaderBoardContainer';
import SalesChart from '../charts/DashBoardSales';

const DashBorad = (props) => {
	return (
		<>
			<Grid
				h='calc(100vh - 120px)'
				templateRows='repeat(8, 1fr)'
				templateColumns={{ base: 'repeat(8, 1fr)', xl: 'repeat(12, 1fr)' }}
				gap={4}
			>
				<GridItem id='dashboard-map-wrapper' rowSpan={5} colSpan={8}>
					<Box
						maxW='100%'
						maxH='100%'
						borderWidth='1px'
						borderRadius='xl'
						overflow='hidden'
					>
						<SimpleMap />
					</Box>
				</GridItem>
				<GridItem rowSpan={6} colSpan={4} overflow='hidden'>
					<LeaderBoardContainer />
				</GridItem>
				<GridItem rowSpan={3} colSpan={8}>
					<Box
						width='100%'
						height='100%'
						borderWidth='1px'
						borderRadius='xl'
						overflow='hidden'
						alignContent='center'
						justifyContent='center'
					>
						<SalesChart />
					</Box>
				</GridItem>
				<GridItem rowSpan={2} colSpan={4}>
					<Box
						width='100%'
						height='100%'
						borderWidth='1px'
						borderRadius='xl'
						overflow='hidden'
						alignContent='center'
						justifyContent='center'
					>
						<StatCard heading={'Total Sales'} />
					</Box>
				</GridItem>
			</Grid>
		</>
	);
};

DashBorad.propTypes = {};

export default DashBorad;
