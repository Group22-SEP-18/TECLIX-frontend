import React from 'react';
import {
	Box,
	Grid,
	GridItem,
	Heading,
	HStack,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	VStack,
} from '@chakra-ui/react';
import First3 from './First3';
import HorPositions from './HorPositions';

const salespersons = [
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 12 },
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 42 },
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 15 },
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 30 },
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 50 },
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 30 },
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 50 },
	{ name: 'Dan Abrahmov', avatar: 'Dan Abrahmov', points: 60 },
];
salespersons
	.sort((a, b) => parseFloat(a.points) - parseFloat(b.points))
	.reverse();

const LeaderBoardContainer = (props) => {
	return (
		<Box flex='1'>
			<VStack>
				{/* Heading */}
				<Heading as='h4' size='md' pt={3}>
					LeaderBoard
				</Heading>
				<Tabs align='center' variant='soft-rounded' colorScheme='green'>
					<TabList>
						<Tab>Today</Tab>
						<Tab>Month</Tab>
						<Tab>AllTime</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
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
											<First3 salesperson={salespersons[1]} position={2} />
										)}
									</GridItem>
									<GridItem>
										{salespersons.length >= 1 && (
											<First3 salesperson={salespersons[0]} position={1} />
										)}
									</GridItem>
									<GridItem pt={4}>
										{salespersons.length >= 3 && (
											<First3 salesperson={salespersons[2]} position={3} />
										)}
									</GridItem>
								</Grid>
							</HStack>
							{/* rest */}
							{salespersons.slice(3, 7).map((salesperson, index) => (
								<HorPositions salesperson={salesperson} position={index + 4} />
							))}
						</TabPanel>
						<TabPanel></TabPanel>
						<TabPanel></TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
		</Box>
	);
};

LeaderBoardContainer.propTypes = {};

export default LeaderBoardContainer;
