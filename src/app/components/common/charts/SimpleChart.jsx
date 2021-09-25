import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Heading } from '@chakra-ui/react';
import colors from '../colors';

const SimpleChart = ({
	type,
	header,
	xAxisValues,
	dataToPlot,
	formatter = 'Rs. {value}',
}) => {
	return (
		<div>
			<Heading as='h2' size='md' p={3}>
				{header}
			</Heading>
			<ReactEcharts
				style={{
					height: '60vh',
					width: '100%',
				}}
				option={{
					tooltip: {
						trigger: 'axis', //'axis' 'none'
						transitionDuration: 0,
					},
					xAxis: {
						type: 'category',
						data: xAxisValues,
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: formatter,
						},
					},
					series: dataToPlot.map((d, index) => ({
						data: d.data,
						type: type,
						lineStyle: {
							color: colors[index].hex,
							width: 2,
						},
						itemStyle: {
							borderWidth: 2,
							borderColor: d.color,
						},
						label: { show: true },
					})),
					legend: {
						type: 'plain',
						padding: [5, 10],
						// data: dataToPlot.map((d) => d.short_product_name),
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true,
					},
				}}
			/>
		</div>
	);
};

SimpleChart.propTypes = {};

export default SimpleChart;
