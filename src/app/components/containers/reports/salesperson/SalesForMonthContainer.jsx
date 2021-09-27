import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { fetchSalesBySalepersonData } from '../../../../redux/actions/reportActions';
import RechartChart from '../../../common/charts/RechartChart';
import LoadingCards from '../../../common/loading/LoadingCards';
import ErrorOverlay from '../../../common/error-overlays/ErrorOverlay';

const SalesForMonthContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSalesBySalepersonData());
	}, [dispatch]);
	const { isLoading, chartValues, error } = useSelector(
		(state) => state.report.salesBySalesperson
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
