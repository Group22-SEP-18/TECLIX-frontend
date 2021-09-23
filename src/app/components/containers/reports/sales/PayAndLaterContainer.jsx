import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { fetchPayOrLaterData } from '../../../../redux/actions/reportActions';
import RechartChart from '../../../common/charts/RechartChart';

const PayAndLaterContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchPayOrLaterData());
	}, [dispatch]);
	const { isLoading, chartColumns, chartValues, error } = useSelector(
		(state) => state.report.payOrLater
	);
	return (
		<Box h='calc(100vh - 200px)' w='80vw'>
			<RechartChart
				data={chartValues}
				XAxisDataKey={'day'}
				barDataKeys={['paid_amount', 'pay_later_amount']}
			/>
		</Box>
	);
};

PayAndLaterContainer.propTypes = {};

export default PayAndLaterContainer;
