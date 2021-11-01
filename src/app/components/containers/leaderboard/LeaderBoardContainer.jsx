import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	Grid,
	GridItem,
	Heading,
	HStack,
	Spacer,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	VStack,
} from '@chakra-ui/react';
import First3 from '../../presentation/leaderboard/First3';
import HorPositions from '../../presentation/leaderboard/HorPositions';
import {
	getLeaderboardAsync,
	selectLeaderboard,
} from '../../../redux/slices/leaderboardSlice';
import LeaderboardSchema from './LeaderboardSchema';
import { selectUserRole } from '../../../redux/slices/userSlice';

const LeaderBoardContainer = ({ withSchema, depth }) => {
	const dispatch = useDispatch();
	const user_role = useSelector(selectUserRole);
	const [timeConstraint, setTimeConstraint] = useState('today');
	const { todayLeaderboard, monthLeaderboard, alltimeLeaderboard } =
		useSelector(selectLeaderboard);
	const salespersons =
		timeConstraint === 'today'
			? todayLeaderboard
			: timeConstraint === 'month'
			? monthLeaderboard
			: alltimeLeaderboard;
	const salespersonsCount = depth || salespersons.length;
	useEffect(() => {
		dispatch(getLeaderboardAsync());
	}, [dispatch]);

	return (
		<Box flex='1'>
			{user_role !== 'Distribution Officer' && withSchema && (
				<HStack>
					<Spacer />
					<LeaderboardSchema />
				</HStack>
			)}
			<VStack>
				{/* Heading */}
				<Heading as='h4' size='md' pt={3}>
					LeaderBoard
				</Heading>
				<Tabs align='center' variant='soft-rounded' colorScheme='green'>
					<TabList>
						<Tab onClick={() => setTimeConstraint('today')}>Today</Tab>
						<Tab onClick={() => setTimeConstraint('month')}>Month</Tab>
						<Tab onClick={() => setTimeConstraint('alltime')}>AllTime</Tab>
					</TabList>
					<TabPanels>
						{[...Array(3)].map((x, i) => (
							<TabPanel key={i}>
								{/* First three places */}
								<HStack pb={4}>
									<Grid
										templateRows='repeat(1, 1fr)'
										templateColumns='repeat(3, 1fr)'
										gap={4}
									>
										{/* second position */}
										<GridItem pt={4}>
											{salespersons.length >= 2 && (
												<First3
													key={2}
													row={salespersons[1]}
													position={2}
													timeConstraint={timeConstraint}
												/>
											)}
										</GridItem>
										{/* first position */}
										<GridItem>
											{salespersons.length >= 1 && (
												<First3
													key={1}
													row={salespersons[0]}
													position={1}
													timeConstraint={timeConstraint}
												/>
											)}
										</GridItem>
										{/* third position */}
										<GridItem pt={4}>
											{salespersons.length >= 3 && (
												<First3
													key={3}
													row={salespersons[2]}
													position={3}
													timeConstraint={timeConstraint}
												/>
											)}
										</GridItem>
									</Grid>
								</HStack>
								{/* rest */}
								{salespersons
									.slice(3, salespersonsCount)
									.map((salesperson, index) => (
										<HorPositions
											key={index}
											row={salesperson}
											position={index + 4}
											timeConstraint={timeConstraint}
										/>
									))}
							</TabPanel>
						))}
					</TabPanels>
				</Tabs>
			</VStack>
		</Box>
	);
};

LeaderBoardContainer.propTypes = {};

export default LeaderBoardContainer;
