import DashBorad from './components/dashboard/DashBorad';
import SalesPersonViewMainPage from './components/pages/salesperson/SalesPersonViewMainPage';
import CustomersMainPage from './components/pages/customers/CustomersMainPage';

export const privateRoutes = [
	{
		path: '/salespersons',
		component: SalesPersonViewMainPage,
	},
	{
		path: '/customers',
		component: CustomersMainPage,
	},
	{
		path: '/',
		component: DashBorad,
	},
];
