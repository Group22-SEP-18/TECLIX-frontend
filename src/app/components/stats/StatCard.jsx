import React from 'react';
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
} from '@chakra-ui/react';

const StatCard = (props) => {
	return (
		<Stat>
			<StatLabel>Sent</StatLabel>
			<StatNumber>345,670</StatNumber>
			<StatHelpText>
				<StatArrow type='increase' />
				23.36%
			</StatHelpText>
		</Stat>
	);
};

StatCard.propTypes = {};

export default StatCard;
