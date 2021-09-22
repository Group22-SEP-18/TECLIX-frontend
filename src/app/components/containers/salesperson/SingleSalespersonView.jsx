/**
 * Summary.
 * Persentation of single sales person view container
 *
 * Description.
 *
 * @file   This files defines the single sales person view.
 * @author Hirumal Priyashan.
 * @since  10.09.2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import SalesPersonVerticalCardView from '../../presentation/salesperson/SalesPersonVerticalCard';
import SalesPersonHistoryContainer from './SalesPersonHistoryContainer';

const SingleSalespersonView = ({ salesperson, onClick }) => {
	return (
		<>
			<Text
				as='button'
				fontWeight={500}
				color={'gray.500'}
				mb={4}
				textAlign='center'
				pl='4'
				onClick={onClick}
			>
				<ArrowBackIcon fontSize='lg' mr={4} />
				Go Back
			</Text>
			<Grid
				h='calc(100vh - 160px)'
				templateRows='repeat(1, 1fr)'
				templateColumns={{ base: 'repeat(8, 1fr)', xl: 'repeat(12, 1fr)' }}
				gap={4}
			>
				<GridItem rowSpan={6} colSpan={8}>
					<Box
						maxW='100%'
						maxH='100%'
						minH='100%'
						borderWidth='1px'
						borderRadius='xl'
						overflow='hidden'
					>
						{/* <SalesPersonHistoryContainer salesperson={salesperson} /> */}
					</Box>
				</GridItem>
				<GridItem rowSpan={6} colSpan={4} overflow='hidden'>
					<Box
						maxW='100%'
						maxH='100%'
						borderWidth='1px'
						borderRadius='xl'
						overflow='hidden'
					>
						<SalesPersonVerticalCardView salesperson={salesperson} />
					</Box>
				</GridItem>
			</Grid>
		</>
	);
};

SingleSalespersonView.propTypes = {
	salesperson: PropTypes.object,
	onClick: PropTypes.func,
};

export default SingleSalespersonView;
