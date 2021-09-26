import React from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

const LoadingSkelton = (props) => {
	return (
		<div>
			<Box padding='6' boxShadow='lg' bg='white'>
				<SkeletonCircle size='10' />
				<SkeletonText mt='4' noOfLines={4} spacing='4' />
			</Box>
		</div>
	);
};

export default LoadingSkelton;
