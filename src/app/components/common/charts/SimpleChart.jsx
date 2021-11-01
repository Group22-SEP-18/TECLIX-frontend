import React from 'react';
import Chart from 'react-apexcharts';

const SimpleChart = ({
	type,
	header,
	xAxisValues,
	dataToPlot,
	formatter = 'Rs. {value}',
}) => {
	const series = dataToPlot.map((d) => ({
		name: d.product_short_name,
		data: d.data,
	}));
	const options = {
		chart: {
			height: 550,
			type: type,
			zoom: {
				enabled: false,
			},
		},
		dataLabels: {
			enabled: true,
			// formatter: (val) => `Rs. ${val}`,
		},
		stroke: {
			curve: 'straight',
		},
		title: {
			text: header,
			align: 'left',
		},
		grid: {
			row: {
				colors: ['#f3f3f3', 'transparent'],
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: xAxisValues,
			title: {
				text: 'Month',
			},
		},
		yaxis: {
			show: true,
			title: {
				text: 'Total Sale (Rs.)',
			},
			lables: {
				show: true,
				align: 'right',
				formatter: (val) => `Rs. ${val}`,
			},
		},
	};
	return (
		<div id='chart'>
			<Chart options={options} series={series} type='line' height={350} />
		</div>
	);
};

SimpleChart.propTypes = {};

export default SimpleChart;
