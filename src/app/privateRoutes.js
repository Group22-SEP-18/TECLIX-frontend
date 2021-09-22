import DashBorad from './components/pages/dashboard/DashBorad';
import SalesPersonViewMainPage from './components/pages/salesperson/SalesPersonViewMainPage';
import CustomersMainPage from './components/pages/customers/CustomersMainPage';
import ProductPage from './components/pages/product/ProductPage';
import VehiclePage from './components/pages/vehicle/VehiclePage';
import MyAccountPage from './components/pages/myAccount/MyAccountPage';

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
		path: '/myaccount',
		component: MyAccountPage,
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
	},
	{
		path: '/reports/sales',
		component: VehiclePage,
		acceptable_user_roles: ['Operation Manager'],
	},
	{
		path: '/reports/salesperson',
		component: VehiclePage,
		acceptable_user_roles: ['Operation Manager'],
	},
	{
		path: '/reports/products',
		component: VehiclePage,
		acceptable_user_roles: ['Operation Manager'],
	},
	{
		path: '/',
		component: DashBorad,
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
	},
];
