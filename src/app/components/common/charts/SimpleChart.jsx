import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Heading } from '@chakra-ui/react';
import colors from '../colors';

const SimpleChart = ({ type, header, xAxisValues, dataToPlot }) => {
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
					},
					series: dataToPlot.map((d, index) => ({
						// name: d.short_product_name,
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
					})),
					// legend: {
					// 	//
					// 	data: dataToPlot.map((d) => d.short_product_name),
					// 	bottom: 0,
					// 	backgroundColor: 'transparent',
					// 	itemWidth: 12,
					// 	itemHeight: 9,
					// },
				}}
			/>
		</div>
	);
};

SimpleChart.propTypes = {};

export default SimpleChart;
