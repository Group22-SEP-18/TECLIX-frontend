import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { fetchProgressBySalepersonData } from '../../../../redux/actions/reportActions';
import RechartChart from '../../../common/charts/RechartChart';

const CompareProgressContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProgressBySalepersonData());
	}, [dispatch]);
	const { isLoading, chartValues, error } = useSelector(
		(state) => state.report.progressBySalesperson
	);
	return (
		<Box h='calc(100vh - 200px)' w='80vw'>
			<RechartChart
				data={chartValues}
				XAxisDataKey={'salesperson'}
				barDataKeys={['sales_last_month', 'sales_current_month']}
			/>
		</Box>
	);
};

CompareProgressContainer.propTypes = {};

export default CompareProgressContainer;
