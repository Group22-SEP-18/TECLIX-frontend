import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import {
	getSalesBySalespersonAsync,
	selectSalesBySalesperson,
} from '../../../../redux/slices/reportSlice';
import RechartChart from '../../../common/charts/RechartChart';
import LoadingCards from '../../../common/loading/LoadingCards';
import ErrorOverlay from '../../../common/error-overlays/ErrorOverlay';

const SalesForMonthContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSalesBySalespersonAsync());
	}, [dispatch]);
	const { isLoading, chartValues, error } = useSelector(
		selectSalesBySalesperson
	);
	if (isLoading) {
		return <LoadingCards count={3} />;
	}
	if (error) {
		<ErrorOverlay error={error} />;
	}
	return (
		<Box h='calc(100vh - 200px)' w='80vw'>
			<RechartChart
				data={chartValues}
				XAxisDataKey={'salesperson'}
				barDataKeys={['sales']}
			/>
		</Box>
	);
};

SalesForMonthContainer.propTypes = {};

export default SalesForMonthContainer;
