/**
 * Summary.
 * Persentation of sidebar
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines the sidebar.
 * @author Hirumal Priyashan.
 * @since  19.09.2021
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
	Drawer,
	DrawerContent,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import Sidebar from './SidebarContent';
import MobileNav from './MobileNav';

const SideBar = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = useSelector((state) => state.user.user);
	return (
		<>
			{/* Side Bar for larger displays */}
			<Sidebar
				bg={useColorModeValue('gray.100', 'gray.900')}
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
				user={user}
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
					<Sidebar onClose={onClose} user={user} />
				</DrawerContent>
			</Drawer>
			{/* Header with Nav button for mini displays */}
			<MobileNav onOpen={onOpen} user={user} />
		</>
	);
};

SideBar.propTypes = {};

export default SideBar;
