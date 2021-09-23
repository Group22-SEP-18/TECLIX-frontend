import React from 'react';
import PropTypes from 'prop-types';
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ReferenceLine,
	ResponsiveContainer,
} from 'recharts';
import colors from '../colors';

const RechartChart = ({ data, XAxisDataKey, barDataKeys }) => {
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey={XAxisDataKey} />
				<YAxis
					domain={[0, 50000]}
					tickFormatter={(tick) => {
						return `Rs. ${tick}`;
					}}
				/>
				<Tooltip />
				<Legend />
				{barDataKeys.map((key, i) => (
					<Bar dataKey={key} barSize={40} key={i} fill={colors[i].hex} />
				))}
			</BarChart>
		</ResponsiveContainer>
	);
};

RechartChart.propTypes = {};

export default RechartChart;
