import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import {
	getPayOrLaterAsync,
	selectPayOrPayLater,
} from '../../../../redux/slices/reportSlice';
import RechartChart from '../../../common/charts/RechartChart';
import LoadingSkelton from '../../../common/loading/LoadingSkelton';
import ErrorOverlay from '../../../common/error-overlays/ErrorOverlay';

const PayAndLaterContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPayOrLaterAsync());
	}, [dispatch]);
	const { isLoading, chartValues, error } = useSelector(selectPayOrPayLater);
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
				XAxisDataKey={'day'}
				barDataKeys={['paid_amount', 'pay_later_amount']}
			/>
		</Box>
	);
};

PayAndLaterContainer.propTypes = {};

export default PayAndLaterContainer;
