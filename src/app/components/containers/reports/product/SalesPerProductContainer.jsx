import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Button,
	Flex,
	Wrap,
	InputLeftAddon,
	InputGroup,
	Select,
	Tag,
	TagCloseButton,
	TagLabel,
	WrapItem,
} from '@chakra-ui/react';
import SimpleChart from '../../../common/charts/SimpleChart';
import LoadingSkelton from '../../../common/loading/LoadingSkelton';
import ErrorOverlay from '../../../common/error-overlays/ErrorOverlay';
import {
	getSalesPerProductAsync,
	getAvailablesForSalesPerProduct,
	getChartValuesForSalesPerProduct,
	salesPerProductAddToAdded,
	salesPerProductRemoveFromAdded,
} from '../../../../redux/slices/reportSlice';

const SalesPerProductContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSalesPerProductAsync());
	}, [dispatch]);
	const { isLoading, chartColumns, error } = useSelector(
		(state) => state.report.salesPerProduct
	);
	const [selected, setSelected] = useState('');
	const chartValues = useSelector(getChartValuesForSalesPerProduct);
	const availables = useSelector(getAvailablesForSalesPerProduct);
	const onClickClose = (id) => {
		dispatch(salesPerProductRemoveFromAdded(id));
	};
	const addToChart = () => {
		dispatch(salesPerProductAddToAdded(selected));
		setSelected('');
	};
	if (isLoading) {
		return <LoadingSkelton />;
	}
	if (error) {
		return <ErrorOverlay error={error} />;
	}
	return (
		<div>
			<InputGroup size='sm'>
				<InputLeftAddon children='Select Product to add' />
				<Select
					placeholder='Select option'
					value={selected}
					onChange={(e) => setSelected(e.target.value)}
				>
					{availables.map((item, i) => (
						<option key={i} value={item.product_id}>
							{item.product_long_name}
						</option>
					))}
				</Select>
			</InputGroup>
			<Flex justify='end'>
				<Button colorScheme='blue' onClick={addToChart} m={4}>
					Add to chart
				</Button>
			</Flex>

			<Wrap spacing={4}>
				{chartValues.map((item, i) => (
					<WrapItem key={item.product_id}>
						<Tag
							size={'lg'}
							key={item.product_id}
							borderRadius='full'
							pb={1}
							variant='solid'
							colorScheme='green'
							minW='150'
						>
							<TagLabel>{item.product_long_name}</TagLabel>
							<TagCloseButton
								pt={1}
								onClick={() => onClickClose(item.product_id)}
							/>
						</Tag>
					</WrapItem>
				))}
			</Wrap>
			<SimpleChart
				type='line'
				header=''
				xAxisValues={chartColumns}
				dataToPlot={chartValues}
			/>
		</div>
	);
};

SalesPerProductContainer.propTypes = {};

export default SalesPerProductContainer;
