import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Text, Flex, HStack, Spacer } from '@chakra-ui/react';

const HorPositions = ({ salesperson, position, timeConstraint = 'today' }) => {
	return (
		<Box>
			<Flex direction='column'>
				<Box px={4} pt={5} pb={3} shadow='lg' borderRadius='lg'>
					<HStack>
						<Box borderRadius='xl' background='green.200' mx={4}>
							<Text as='h3' fontWeight='bold' px={1.5}>
								{position}
							</Text>
						</Box>
						<Avatar src={salesperson.profile_picture} />
						<Box width='full'>
							<Text noOfLines={1} fontWeight='bold'>
								{salesperson.first_name} {salesperson.last_name}
							</Text>
							<Text fontSize='sm' align='right'>
								{salesperson.leaderboard_points[timeConstraint]} points
							</Text>
						</Box>
						<Spacer />
					</HStack>
				</Box>
			</Flex>
		</Box>
	);
};

HorPositions.propTypes = {
	salesperson: PropTypes.any,
	position: PropTypes.number,
	timeConstraint: PropTypes.string,
};

export default HorPositions;
