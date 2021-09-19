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
		subHeaders: [
			{
				name: 'Dashboard',
				icon: FiHome,
				link: '/',
			},
			{
				name: 'Account',
				icon: FiUser,
				link: '/myaccount',
			},
		],
	},
	{
		header: 'Reports',
		subHeaders: [
			{
				name: 'Sales',
				icon: FiTrendingUp,
				link: '/reports/sales',
			},
			{
				name: 'SalesPersons',
				icon: FiUsers,
				link: '/reports/salespersons',
			},
			{
				name: 'Products',
				icon: FiShoppingCart,
				link: '/reports/products',
			},
		],
	},
	{
		header: 'Management',
		subHeaders: [
			{
				name: 'SalesPersons',
				icon: FiUsers,
				link: '/salespersons',
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
				name: 'Customer',
				icon: FiUserCheck,
				link: '/customers',
			},
			{
				name: 'Products',
				icon: FiShoppingCart,
				link: '/products',
			},
			{
				name: 'Vehicles',
				icon: FaShuttleVan,
				link: '/vehicles',
			},
		],
	},
];

export default sidebarContent;
