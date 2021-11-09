import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Text, VStack } from '@chakra-ui/react';
import { FaCrown } from 'react-icons/fa';
import { capitalize } from 'lodash';

const First3 = ({ row, position, timeConstraint = 'today' }) => {
	if (!row || !position) {
		return null;
	}
	const { salesperson, points_today, points_current_month, points_all_time } =
		row;
	const points =
		timeConstraint === 'today'
			? points_today
			: timeConstraint === 'month'
			? points_current_month
			: points_all_time;
	return (
		<VStack
			id={`leaderboard_first_3_div_${position}`}
			shadow='lg'
			borderRadius='lg'
			p={3}
		>
			{position !== 1 && (
				<Box borderRadius='xl' background='green.200' mx={4}>
					<Text as='h3' fontWeight='bold' px={1.5}>
						{position}
					</Text>
				</Box>
			)}
			{position === 1 && <FaCrown color='gold' />}
			<Avatar
				id={`leaderboard_first_3_sp_profile_picture_${position}`}
				src={salesperson.profile_picture}
			/>
			<Box>
				<Text
					id={`leaderboard_first_3_sp_name_${position}`}
					align='center'
					noOfLines={1}
					fontWeight='bold'
					isTruncated='true'
				>
					{capitalize(salesperson.first_name)}{' '}
					{capitalize(salesperson.last_name)}
				</Text>
				<Text
					id={`leaderboard_first_3_sp_points_${position}`}
					fontSize='sm'
					align='center'
				>
					{points} points
				</Text>
			</Box>
		</VStack>
	);
};

First3.propTypes = {
	salesperson: PropTypes.any,
	position: PropTypes.number,
	timeConstraint: PropTypes.string,
};

export default First3;
