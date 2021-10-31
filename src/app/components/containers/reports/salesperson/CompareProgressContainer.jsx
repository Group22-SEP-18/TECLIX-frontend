import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import {
	getProgressBySalespersonAsync,
	selectProgressBySalesperson,
} from '../../../../redux/slices/reportSlice';
import RechartChart from '../../../common/charts/RechartChart';
import LoadingSkelton from '../../../common/loading/LoadingSkelton';
import ErrorOverlay from '../../../common/error-overlays/ErrorOverlay';

const CompareProgressContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProgressBySalespersonAsync());
	}, [dispatch]);
	const { isLoading, chartValues, error } = useSelector(
		selectProgressBySalesperson
	);
	if (isLoading) {
		return <LoadingSkelton />;
	}
	if (error) {
		<ErrorOverlay error={error} />;
	}
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
