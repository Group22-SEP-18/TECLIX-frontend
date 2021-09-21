import DashBorad from './components/pages/dashboard/DashBorad';
import SalesPersonViewMainPage from './components/pages/salesperson/SalesPersonViewMainPage';
import CustomersMainPage from './components/pages/customers/CustomersMainPage';
import ProductPage from './components/productpage/ProductPage';
import VehiclePage from './components/vehiclepage/VehiclePage';

export const privateRoutes = [
	{
		path: '/salespersons',
		component: SalesPersonViewMainPage,
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
	},
	{
		path: '/customers',
		component: CustomersMainPage,
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
	},
	{
		path: '/products',
		component: ProductPage,
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
	},
	{
		path: '/vehicles',
		component: VehiclePage,
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
	},
	{
		path: '/',
		component: DashBorad,
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
	},
];
