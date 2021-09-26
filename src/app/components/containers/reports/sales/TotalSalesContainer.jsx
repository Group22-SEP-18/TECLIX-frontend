import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { fetchSalesPerMonthData } from '../../../../redux/actions/reportActions';
import RechartChart from '../../../common/charts/RechartChart';
import LoadingCards from '../../../common/loading/LoadingCards';
import ErrorOverlay from '../../../common/error-overlays/ErrorOverlay';

const TotalSalesContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSalesPerMonthData());
	}, [dispatch]);
	const { isLoading, chartValues, error } = useSelector(
		(state) => state.report.salesPerMonth
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
				XAxisDataKey={'month'}
				barDataKeys={['sales']}
			/>
		</Box>
	);
};

TotalSalesContainer.propTypes = {};

export default TotalSalesContainer;
