import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

const DashBorad = (props) => {
	return (
		<>
			<Grid
				h='calc(100vh - 120px)'
				templateRows='repeat(4, 1fr)'
				templateColumns='repeat(12, 1fr)'
				gap={4}
			>
				<GridItem rowSpan={3} colSpan={8} bg='tomato' />
				<GridItem rowSpan={3} colSpan={4} bg='tomato' />
				<GridItem colSpan={4} bg='tomato' />
				<GridItem colSpan={4} bg='tomato' />
				<GridItem colSpan={4} bg='tomato' />
			</Grid>
		</>
	);
};

DashBorad.propTypes = {};

export default DashBorad;
