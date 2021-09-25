import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { fetchSalesBySalepersonData } from '../../../../redux/actions/reportActions';
import RechartChart from '../../../common/charts/RechartChart';

const SalesForMonthContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSalesBySalepersonData());
	}, [dispatch]);
	const { isLoading, chartColumns, chartValues, error } = useSelector(
		(state) => state.report.salesBySalesperson
	);
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
