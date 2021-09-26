import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import colors from '../colors';

const RechartChart = ({ data, XAxisDataKey, barDataKeys }) => {
	var maxi = 0;
	for (let index = 0; index < barDataKeys.length; index++) {
		maxi = Math.max(...data.map((d) => d[barDataKeys[index]]), maxi);
	}
	console.log(maxi);
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart
				minwidth={500}
				minheight={300}
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
					domain={[0, parseInt(maxi * 1.2)]}
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
