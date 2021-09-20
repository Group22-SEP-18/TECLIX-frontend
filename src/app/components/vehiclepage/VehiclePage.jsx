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
 * @author Shehan Perera.
 * @since  13.09.2021
 */

import React from 'react';
import {
	Box,
	Drawer,
	DrawerContent,
	useDisclosure,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import Sidebar from '../sidebar/SidebarContent';
import MobileNav from '../sidebar/MobileNav';
import VehicleCard from '../vehiclecard/VehicleCard';

const VehiclePage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const categoryList = ['Lorry', 'Van', 'Bus', 'ThreeWheeler'];

	const data = [
		{
			vehicle_type: 'Lorry',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '1',
			is_deleted: false,
		},
		{
			vehicle_type: 'Van',
			vehicle_model: 'Hiace',
			image_url: '/6025.jpg',
			vehicle_id: '2',
			is_deleted: false,
		},
		{
			vehicle_type: 'Bus',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '3',
			is_deleted: false,
		},
		{
			vehicle_type: 'ThreeWheeler',
			vehicle_model: 'Piaggio',
			image_url: '/6025.jpg',
			vehicle_id: '4',
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '5',
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '6',
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '7',
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '8',
			is_deleted: false,
		},
	];

	return (
		<Box minH='100vh'>
			{/* Side Bar for larger displays */}
			<Sidebar
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
				<Grid
					templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
					gap={1}
				>
					{data.map((vehicle, index) => (
						<GridItem>
							<VehicleCard
								key={index}
								categoryList={categoryList}
								vehicle_type={vehicle.vehicle_type}
								vehicle_model={vehicle.vehicle_model}
								image_url={vehicle.image_url}
								vehicle_id={vehicle.vehicle_id}
								is_deleted={vehicle.is_deleted}
							/>
						</GridItem>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

VehiclePage.propTypes = {};

export default VehiclePage;
