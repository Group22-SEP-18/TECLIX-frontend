import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Heading } from '@chakra-ui/react';

const SalesChart = (props) => {
	return (
		<div>
			<Heading as='h2' size='md' p={3}>
				Sales
			</Heading>
			<ReactEcharts
				option={{
					xAxis: {
						type: 'category',
						data: [
							'Jan',
							'Feb',
							'Mar',
							'Apr',
							'May',
							'Jun',
							'Jul',
							'Aug',
							'Sept',
							'Oct',
							'Nov',
							'Dec',
						],
					},
					yAxis: {
						type: 'value',
					},
					series: [
						{
							data: [
								820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
							],
							type: 'line',
							lineStyle: {
								color: 'blue',
								width: 2,
							},
							itemStyle: {
								borderWidth: 2,
								borderColor: '#a5b0af',
							},
						},
						{
							data: [
								820, 1320, 820, 932, 901, 934, 1290, 932, 901, 934, 1290, 1330,
							],
							type: 'line',
							lineStyle: {
								color: 'red',
								width: 2,
							},
							itemStyle: {
								borderWidth: 2,
								borderColor: '#a5b0af',
							},
						},
					],
				}}
			/>
		</div>
	);
};

SalesChart.propTypes = {};

export default SalesChart;
