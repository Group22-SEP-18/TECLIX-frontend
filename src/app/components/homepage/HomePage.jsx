/**
 * Summary.
 * Persentation of pages for a authorized user
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines the pages.
 * @author Hirumal Priyashan.
 * @since  05.09.2021
 */

import React from 'react';
import {
	Box,
	Drawer,
	DrawerContent,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import Sidebar from '../sidebar/SidebarContent';
import MobileNav from '../sidebar/MobileNav';
import DashBorad from '../dashboard/DashBorad';
import SalesPersonViewMainPage from '../view-salesperson/SalesPersonViewMainPage';

const HomePage = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH='100vh'>
			{/* Side Bar for larger displays */}
			<Sidebar
				bg={useColorModeValue('gray.100', 'gray.900')}
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			{/*Drawer for mini displays  */}
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<Sidebar onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* Header with Nav button for mini displays */}
			<MobileNav onOpen={onOpen} />
			{/* Content */}
			<Box ml={{ base: 0, md: 60 }} p='4'>
				<SalesPersonViewMainPage />
				{/* <DashBorad /> */}
			</Box>
		</Box>
	);
};

HomePage.propTypes = {};

export default HomePage;
