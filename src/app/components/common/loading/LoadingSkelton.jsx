import React from 'react';
import { Skeleton } from '@chakra-ui/react';

const LoadingSkelton = (props) => {
	return (
		<div>
			<Skeleton h='100vh'>
				<div></div>
			</Skeleton>
		</div>
	);
};

export default LoadingSkelton;
