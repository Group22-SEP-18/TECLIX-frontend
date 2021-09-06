import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Typography } from '@chakra-ui/react';

const PageDashboard = () => (
	<Typography variant='h3' component='h1'>
		Dashboard Page
	</Typography>
);
const PageOrders = () => (
	<Typography variant='h3' component='h1'>
		Orders Page
	</Typography>
);
const PageCustomers = () => (
	<Typography variant='h3' component='h1'>
		Customers Page
	</Typography>
);
const PageReports = () => (
	<Typography variant='h3' component='h1'>
		Reports Page
	</Typography>
);

const Content = () => {
	let { path, _ } = useRouteMatch();

	return (
		<Switch>
			<Route exact path={path}>
				<Typography variant='h3' component='h1'>
					Reports Page
				</Typography>
			</Route>
			<Route path={`${path}/sales`}>
				<PageOrders />
			</Route>
			<Route path={`${path}/customers`}>
				<PageCustomers />
			</Route>
			<Route path={`${path}/salespersons`}>
				<PageReports />
			</Route>
		</Switch>
	);
};

export default Content;
