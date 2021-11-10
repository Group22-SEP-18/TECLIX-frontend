import {
	FiHome,
	FiShoppingCart,
	FiTrendingUp,
	FiUser,
	FiUserCheck,
	FiUsers,
} from 'react-icons/fi';
import { FaShuttleVan } from 'react-icons/fa';

const sidebarContent = [
	{
		header: 'General',
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
		subHeaders: [
			{
				name: 'Dashboard',
				icon: FiHome,
				link: '/',
				acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
			},
			{
				name: 'Account',
				icon: FiUser,
				link: '/myaccount',
				acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
			},
		],
	},
	{
		header: 'Reports',
		acceptable_user_roles: ['Operation Manager'],
		subHeaders: [
			{
				name: 'Sales',
				icon: FiTrendingUp,
				link: '/reports/sales',
				acceptable_user_roles: ['Operation Manager'],
			},
			{
				name: 'Salespersons',
				icon: FiUsers,
				link: '/reports/salespersons',
				acceptable_user_roles: ['Operation Manager'],
			},
			{
				name: 'Products',
				icon: FiShoppingCart,
				link: '/reports/products',
				acceptable_user_roles: ['Operation Manager'],
			},
		],
	},
	{
		header: 'Management',
		acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
		subHeaders: [
			{
				name: 'Salesperson',
				icon: FiUsers,
				link: '/salespersons',
				acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
				// items: [
				// 	{
				// 		name: 'View',
				// 		link: '/salespersons',
				// 	},
				// 	{
				// 		name: 'Another one',
				// 		link: '/salespersons',
				// 	},
				// ],
			},
			{
				name: 'Distribution Officer',
				icon: FiUsers,
				link: '/distribution-officers',
				acceptable_user_roles: ['Operation Manager'],
			},
			{
				name: 'Customer',
				icon: FiUserCheck,
				link: '/customers',
				acceptable_user_roles: ['Distribution Officer', 'Operation Manager'],
			},
			{
				name: 'Product',
				icon: FiShoppingCart,
				link: '/products',
				acceptable_user_roles: ['Distribution Officer'],
			},
			{
				name: 'Vehicle',
				icon: FaShuttleVan,
				link: '/vehicles',
				acceptable_user_roles: ['Distribution Officer'],
			},
		],
	},
];

export default sidebarContent;
