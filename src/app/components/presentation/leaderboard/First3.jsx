import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Text, VStack } from '@chakra-ui/react';
import { FaCrown } from 'react-icons/fa';

const First3 = ({ row, position, timeConstraint = 'today' }) => {
	const { salesperson, points_today, points_current_month, points_all_time } =
		row;
	const points =
		timeConstraint === 'today'
			? points_today
			: timeConstraint === 'month'
			? points_current_month
			: points_all_time;
	return (
		<VStack shadow='lg' borderRadius='lg' p={3}>
			{position !== 1 && (
				<Box borderRadius='xl' background='green.200' mx={4}>
					<Text as='h3' fontWeight='bold' px={1.5}>
						{position}
					</Text>
				</Box>
			)}
			{position === 1 && <FaCrown color='gold' />}
			<Avatar src={salesperson.profile_picture} />
			<Box>
				<Text align='center' noOfLines={1} fontWeight='bold' isTruncated='true'>
					{salesperson.first_name} {salesperson.last_name}
				</Text>
				<Text fontSize='sm' align='center'>
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
