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
import SideBar from '../../common/sidebar/SideBar';
import VehicleCard from '../../presentation/vehicle/VehicleCard';
import AddVehicleForm from '../../presentation/vehicle/AddVehicleForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleData } from '../../../redux/actions/vehicleActions';

const VehiclePage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenReportModal,
		onOpen: onOpenReportModal,
		onClose: onCloseReportModal,
	} = useDisclosure();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVehicleData());
	}, [dispatch]);
	const { vehicles, isLoading, error } = useSelector((state) => state.vehicles);
	const data = [
		{
			vehicle_type: 'Lorry',
			vehicle_model: 'Layland',
			vehicle_image: '/6025.jpg',
			id: '1',
			salesperson: [
				{
					email: 'shehanxperera@gmail.com',
					first_name: 'Shehan Perera',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],

			assigned_products: [
				{
					product: {
						id: 1,
						short_name: 'Tikiri Marie',
						long_name: 'Munchee Tikiri Marie',
						product_image: '/1234.jpg',
						category: 'biscuit',
						price: '120.00',
					},
					quantity: '12',
				},
				{
					product: {
						id: 2,
						short_name: 'Gold Marie',
						long_name: 'Munchee Tikiri Marie',
						product_image: '/1234.jpg',
						category: 'biscuit',
						price: '120.00',
					},
					quantity: '23',
				},
				{
					product: {
						id: 1,
						short_name: 'Cream Cracker',
						long_name: 'Munchee Tikiri Marie',
						product_image: '/1234.jpg',
						category: 'biscuit',
						price: '130.00',
					},
					quantity: '127',
				},
			],
			is_deleted: false,
		},
		{
			vehicle_type: 'Lorry',
			vehicle_model: 'Layland',
			vehicle_image: '/6025.jpg',
			id: '1',
			salesperson: [
				{
					email: 'shehanxperera@gmail.com',
					first_name: 'Hiroon Perera',
					image_url: 'https://bit.ly/sage-adebayo',
				},
			],

			assigned_products: [
				{
					product: {
						id: 1,
						short_name: 'Tikiri Marie',
						long_name: 'Munchee Tikiri Marie',
						product_image: '/1234.jpg',
						category: 'biscuit',
						price: '120.00',
					},
					quantity: '12',
				},
				{
					product: {
						id: 1,
						short_name: 'Tikiri Marie',
						long_name: 'Munchee Tikiri Marie',
						product_image: '/1234.jpg',
						category: 'biscuit',
						price: '120.00',
					},
					quantity: '122',
				},
			],
			is_deleted: false,
		},
	];

	if (isLoading) return <h3>Loading ...</h3>;
	if (error) return <h3>{error}</h3>;
	return (
		<Box minH='100vh'>
			<SideBar />
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
								salesperson={vehicle.salesperson}
								vehicle_type={vehicle.vehicle_type}
								vehicle_model={vehicle.vehicle_model}
								vehicle_image={vehicle.vehicle_image}
								id={vehicle.id}
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
