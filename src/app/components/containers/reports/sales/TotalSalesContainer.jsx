import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import RechartChart from '../../../common/charts/RechartChart';
import LoadingCards from '../../../common/loading/LoadingCards';
import ErrorOverlay from '../../../common/error-overlays/ErrorOverlay';
import {
	selectSalesPerMonth,
	getSalesPerMonthAsync,
} from '../../../../redux/slices/reportSlice';

const TotalSalesContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSalesPerMonthAsync());
	}, [dispatch]);
	const { isLoading, chartValues, error } = useSelector(selectSalesPerMonth);
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
				XAxisDataKey={'month'}
				barDataKeys={['sales']}
			/>
		</Box>
	);
};

TotalSalesContainer.propTypes = {};

export default TotalSalesContainer;
