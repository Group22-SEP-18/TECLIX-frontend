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
	return (
		<>
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
		</>
	);
};

SideBar.propTypes = {};

export default SideBar;
