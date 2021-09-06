import React from 'react';
import {
	Box,
	Heading,
	Stat,
	StatGroup,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
} from '@chakra-ui/react';

const StatCard = ({ heading }) => {
	return (
		<Box p={4}>
			{/* Heading */}
			<Heading as='h4' size='md' py={3}>
				{heading}
			</Heading>
			<StatGroup>
				<Stat>
					<StatLabel>This Month</StatLabel>
					<StatNumber>245,600</StatNumber>
					<StatHelpText>
						<StatArrow type='increase' />
						23.36%
					</StatHelpText>
				</Stat>
				<Stat>
					<StatLabel>Last Month</StatLabel>
					<StatNumber>345,670</StatNumber>
				</Stat>
				<Stat display={{ base: 'none', xl: 'block' }}>
					<StatLabel>Previous Month</StatLabel>
					<StatNumber>345,670</StatNumber>
				</Stat>
			</StatGroup>
		</Box>
	);
};

StatCard.propTypes = {};

export default StatCard;
