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
	Button,
	Grid,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	ModalCloseButton,
	ModalHeader,
	GridItem,
} from '@chakra-ui/react';
import Sidebar from '../sidebar/SidebarContent';
import MobileNav from '../sidebar/MobileNav';
import VehicleCard from './VehicleCard';
import AddVehicleForm from './AddVehicleForm';

const VehiclePage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();

	const data = [
		{
			vehicle_type: 'Lorry',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '1',
			assigned_salesperson: [
				{
					first_name: 'Peter Paul',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],

			assigned_products: [
				{
					product_shortname: 'Chocolate Biscuit',
					product_quantity: '12',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Tikiri Marie',
					product_quantity: '10',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Gold Marie',
					product_quantity: '20',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Hawain Cookies',
					product_quantity: '15',
					product_imageURL: '/1234.jpg',
				},
			],
			is_deleted: false,
		},
		{
			vehicle_type: 'Van',
			vehicle_model: 'Hiace',
			image_url: '/6025.jpg',
			vehicle_id: '2',
			assigned_salesperson: [],
			assigned_products: [
				{
					product_shortname: 'Tikiri Marie',
					product_quantity: '10',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Gold Marie',
					product_quantity: '20',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Hawain Cookies',
					product_quantity: '15',
					product_imageURL: '/1234.jpg',
				},
			],
			is_deleted: false,
		},
		{
			vehicle_type: 'Bus',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '3',
			assigned_salesperson: [
				{
					first_name: 'Peter Paul',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],
			assigned_products: [
				{
					product_shortname: 'Chocolate Biscuit',
					product_quantity: '12',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Tikiri Marie',
					product_quantity: '10',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Gold Marie',
					product_quantity: '20',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Hawain Cookies',
					product_quantity: '15',
					product_imageURL: '/1234.jpg',
				},
			],
			is_deleted: false,
		},
		{
			vehicle_type: 'ThreeWheeler',
			vehicle_model: 'Piaggio',
			image_url: '/6025.jpg',
			vehicle_id: '4',
			assigned_salesperson: [],
			assigned_products: [],
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '5',
			assigned_salesperson: [
				{
					first_name: 'Peter Paul',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],
			assigned_products: [
				{
					product_shortname: 'Chocolate Biscuit',
					product_quantity: '12',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Tikiri Marie',
					product_quantity: '10',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Gold Marie',
					product_quantity: '20',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Hawain Cookies',
					product_quantity: '15',
					product_imageURL: '/1234.jpg',
				},
			],
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '6',
			assigned_salesperson: [
				{
					first_name: 'Peter Paul',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],
			assigned_products: [
				{
					product_shortname: 'Chocolate Biscuit',
					product_quantity: '12',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Tikiri Marie',
					product_quantity: '10',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Gold Marie',
					product_quantity: '20',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Hawain Cookies',
					product_quantity: '15',
					product_imageURL: '/1234.jpg',
				},
			],
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '7',
			assigned_salesperson: [
				{
					first_name: 'Peter Paul',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],
			assigned_products: [
				{
					product_shortname: 'Chocolate Biscuit',
					product_quantity: '12',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Tikiri Marie',
					product_quantity: '10',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Gold Marie',
					product_quantity: '20',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Hawain Cookies',
					product_quantity: '15',
					product_imageURL: '/1234.jpg',
				},
			],
			is_deleted: false,
		},
		{
			vehicle_type: 'Biscuit',
			vehicle_model: 'Layland',
			image_url: '/6025.jpg',
			vehicle_id: '8',
			assigned_salesperson: [
				{
					first_name: 'Peter Paul',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],
			assigned_products: [
				{
					product_shortname: 'Chocolate Biscuit',
					product_quantity: '12',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Tikiri Marie',
					product_quantity: '10',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Gold Marie',
					product_quantity: '20',
					product_imageURL: '/1234.jpg',
				},
				{
					product_shortname: 'Hawain Cookies',
					product_quantity: '15',
					product_imageURL: '/1234.jpg',
				},
			],
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
				<Box pl='6'>
					<Button colorScheme='whatsapp' onClick={onOpenReportModal} size='lg'>
						Add a vehicle
					</Button>
					<Modal
						closeOnOverlayClick={false}
						onClose={onCloseReportModal}
						isOpen={isOpenReportModal}
						motionPreset='scale'
						isCentered
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Edit Product Details</ModalHeader>
							<ModalCloseButton />
							<ModalBody pb='5'>
								{/* <AddVehicleForm
									// // categoryList={categoryList}
									// // updateDetails={updateDetails}
									// trigger={onClose}
								/> */}
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
				<Grid
					templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
					gap={1}
				>
					{data.map((vehicle, index) => (
						<GridItem>
							<VehicleCard
								key={index}
								assigned_products={vehicle.assigned_products}
								assigned_salesperson={vehicle.assigned_salesperson}
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
