import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Button,
	Flex,
	HStack,
	InputLeftAddon,
	InputGroup,
	Select,
	Tag,
	TagCloseButton,
	TagLabel,
} from '@chakra-ui/react';
import { fetchSalesPerProductData } from '../../../../redux/actions/reportActions';
import SimpleChart from '../../../common/charts/SimpleChart';

const SalesPerProductContainer = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSalesPerProductData());
	}, [dispatch]);
	const { isLoading, chartColumns, chartValues, error } = useSelector(
		(state) => state.report.salesPerProduct
	);
	const [available, setAvailable] = useState(chartValues);
	const [added, setAdded] = useState([]);
	const [selected, setSelected] = useState('');
	const onClickClose = (id) => {
		const found = added.find((a) => a.product_long_name === id);
		const newAdded = added.filter((a) => a.product_long_name !== id);
		setAdded(newAdded);
		console.log(newAdded);
		const newAvailable = available.slice();
		newAvailable.push(found);
		console.log(newAvailable);
		setAvailable(newAvailable);
		console.log('added');
		console.log(added);
		console.log('available');
		console.log(available);
	};
	const addToChart = () => {
		const found = available.find((a) => a.product_long_name === selected);
		const newAvailable = available.filter(
			(a) => a.product_long_name !== selected
		);
		setAvailable(newAvailable);
		const newAdded = added;
		newAdded.push(found);
		setAvailable(newAdded);
		setSelected('');
		console.log('added');
		console.log(added);
		console.log('available');
		console.log(available);
	};
	return (
		<div>
			<InputGroup size='sm'>
				<InputLeftAddon children='Select Product to add' />
				<Select
					placeholder='Select option'
					value={selected}
					onChange={(e) => setSelected(e.target.value)}
				>
					{chartValues.map((item, i) => (
						<option key={i} value={item.product_long_name}>
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

			<HStack spacing={4}>
				{added.map((item) => (
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
							onClick={() => onClickClose(item.product_long_name)}
						/>
					</Tag>
				))}
			</HStack>
			<SimpleChart
				type='line'
				header=''
				xAxisValues={chartColumns}
				dataToPlot={added}
			/>
		</div>
	);
};

SalesPerProductContainer.propTypes = {};

export default SalesPerProductContainer;
