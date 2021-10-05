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
import { Box, Grid, GridItem } from '@chakra-ui/react';
import VehicleCard from '../../presentation/vehicle/VehicleCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleAssignData } from '../../../redux/actions/vehicleActions';
import { getSalespersons } from '../../../redux/actions/salespersonActions';
import { fetchProductData } from '../../../redux/actions/productActions';

const AssignedVehicles = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVehicleAssignData());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getSalespersons());
	}, [dispatch]);
	useEffect(() => {
		dispatch(fetchProductData());
	}, [dispatch]);

	const { products } = useSelector((state) => state.products);
	const { salespersons } = useSelector((state) => state.salespersons);
	const { vehiclesAssignments } = useSelector(
		(state) => state.vehiclesAssignments
	);

	const salespersonsId = new Map();
	vehiclesAssignments.forEach((v) => {
		salespersonsId.set(v.salesperson, v.id);
	});

	const unassignedSalespersons = [];
	salespersons.forEach((s) => {
		if (!salespersonsId.get(s.id)) {
			unassignedSalespersons.push(s);
		}
	});

	const vehicledata = [
		{
			id: 2,
			vehicle_number: 'NC-1234',
			vehicle_type: 'LORRY',
			vehicle_image:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture9_k8irkm',
			vehicle_model: 'Maxmo Batta',
			created_by: 1,
			salesperson: [
				{
					id: 1,
					email: 'kane@gmail.com',
					employee_no: 'EMP1001',
					first_name: 'kane',
					last_name: 'peries',
					contact_no: '0771234569',
					profile_picture:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632491782153_yiznrc',
					is_approved: true,
				},
			],
			assigned_products: [
				{
					product: {
						id: 5,
						short_name: 'Hand Picked',
						long_name: 'Hand Picked Collection 550g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture2_j8i7db',
						category: 'biscuit',
						price: '300.00',
					},
					quantity: 4,
				},
				{
					product: {
						id: 6,
						short_name: 'Milk Cream Biscuit',
						long_name: 'Munchee Milk Cream Biscuit 255g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
						category: 'biscuit',
						price: '120.00',
					},
					quantity: 7,
				},
				{
					product: {
						id: 7,
						short_name: 'Nut Bars',
						long_name: 'Nice & Natural Chocolate Nut Bar 180g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture4_vw01xi',
						category: 'cookies',
						price: '200.00',
					},
					quantity: 9,
				},
				{
					product: {
						id: 8,
						short_name: 'Tipi Tip',
						long_name: 'Tipi Tip Extruded Snack 55g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
						category: 'chips',
						price: '60.00',
					},
					quantity: 10,
				},
			],
		},
		{
			id: 3,
			vehicle_number: 'BG-1857',
			vehicle_type: 'THREEWHEELER',
			vehicle_image:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture10_uq7ooh',
			vehicle_model: 'Piaggio',
			created_by: 1,
			salesperson: [
				{
					id: 9,
					email: 'nim@gmail.com',
					employee_no: 'EMP1015',
					first_name: 'nimal',
					last_name: 'perera',
					contact_no: '0785963214',
					profile_picture:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575208451_prgvqe',
					is_approved: true,
				},
			],
			assigned_products: [
				{
					product: {
						id: 8,
						short_name: 'Tipi Tip',
						long_name: 'Tipi Tip Extruded Snack 55g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
						category: 'chips',
						price: '60.00',
					},
					quantity: 10,
				},
				{
					product: {
						id: 9,
						short_name: 'Cheddar Cheese',
						long_name: 'Processed Cheddar Cheese 250g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
						category: 'cheese',
						price: '350.00',
					},
					quantity: 22,
				},
				{
					product: {
						id: 12,
						short_name: 'Crunchee Carols',
						long_name: 'Munchee Biscuit Crunchee Carols 275g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/cc_leef8j',
						category: 'biscuit',
						price: '140.00',
					},
					quantity: 5,
				},
			],
		},
		{
			id: 5,
			vehicle_number: 'GHT-5467',
			vehicle_type: 'LORRY',
			vehicle_image:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture16_bwpjuz',
			vehicle_model: 'Emaktinam 400',
			created_by: 1,
			salesperson: [
				{
					id: 10,
					email: 'sak@gmail.com',
					employee_no: 'EMP1018',
					first_name: 'shane',
					last_name: 'silva',
					contact_no: '0785962525',
					profile_picture:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575390036_wmqrmz',
					is_approved: false,
				},
			],
			assigned_products: [
				{
					product: {
						id: 5,
						short_name: 'Hand Picked',
						long_name: 'Hand Picked Collection 550g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture2_j8i7db',
						category: 'biscuit',
						price: '300.00',
					},
					quantity: 4,
				},
				{
					product: {
						id: 6,
						short_name: 'Milk Cream Biscuit',
						long_name: 'Munchee Milk Cream Biscuit 255g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
						category: 'biscuit',
						price: '120.00',
					},
					quantity: 7,
				},
			],
		},
		{
			id: 6,
			vehicle_number: 'JC-3290',
			vehicle_type: 'VAN',
			vehicle_image:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture17_jdwf90',
			vehicle_model: 'Supro Maxximo',
			created_by: 1,
			salesperson: [
				{
					id: 8,
					email: 'kasun@gmail.com',
					employee_no: 'EMP1011',
					first_name: 'kasun',
					last_name: 'chamika',
					contact_no: '0785963214',
					profile_picture:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575121855_ywrrnb',
					is_approved: true,
				},
			],
			assigned_products: [
				{
					product: {
						id: 9,
						short_name: 'Cheddar Cheese',
						long_name: 'Processed Cheddar Cheese 250g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture12_vk1i8d',
						category: 'cheese',
						price: '350.00',
					},
					quantity: 22,
				},
				{
					product: {
						id: 12,
						short_name: 'Crunchee Carols',
						long_name: 'Munchee Biscuit Crunchee Carols 275g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/cc_leef8j',
						category: 'biscuit',
						price: '140.00',
					},
					quantity: 5,
				},
				{
					product: {
						id: 13,
						short_name: 'Oreo Biscuit',
						long_name: 'Oreo Biscuit Original Cream 256.5G',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/oreo_ye6fzi',
						category: 'biscuit',
						price: '650.00',
					},
					quantity: 10,
				},
			],
		},
		{
			id: 7,
			vehicle_number: 'BUN-4563',
			vehicle_type: 'BUS',
			vehicle_image:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture18_ey3pho',
			vehicle_model: 'TATA Marcopolo',
			created_by: 1,
			salesperson: [],
			assigned_products: [
				{
					product: {
						id: 7,
						short_name: 'Nut Bars',
						long_name: 'Nice & Natural Chocolate Nut Bar 180g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture4_vw01xi',
						category: 'cookies',
						price: '200.00',
					},
					quantity: 9,
				},
				{
					product: {
						id: 8,
						short_name: 'Tipi Tip',
						long_name: 'Tipi Tip Extruded Snack 55g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture8_e6b0re',
						category: 'chips',
						price: '60.00',
					},
					quantity: 10,
				},
			],
		},
		{
			id: 8,
			vehicle_number: 'CAB-3567',
			vehicle_type: 'CAB',
			vehicle_image:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture20_cihoke',
			vehicle_model: 'Audi A7',
			created_by: 1,
			salesperson: [
				{
					id: 11,
					email: 'shez@gmail.com',
					employee_no: 'EMP1022',
					first_name: 'shehani',
					last_name: 'perera',
					contact_no: '0785962333',
					profile_picture:
						'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/staff/image_cropper_1632575489746_zqmqzu',
					is_approved: true,
				},
			],
			assigned_products: [
				{
					product: {
						id: 5,
						short_name: 'Hand Picked',
						long_name: 'Hand Picked Collection 550g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture2_j8i7db',
						category: 'biscuit',
						price: '300.00',
					},
					quantity: 4,
				},
			],
		},
		{
			id: 4,
			vehicle_number: 'WP HY-1289',
			vehicle_type: 'LORRY',
			vehicle_image:
				'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/vehicle/Picture15_edijgw',
			vehicle_model: 'Dimo Batta',
			created_by: 1,
			salesperson: [],
			assigned_products: [
				{
					product: {
						id: 5,
						short_name: 'Hand Picked',
						long_name: 'Hand Picked Collection 550g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture2_j8i7db',
						category: 'biscuit',
						price: '300.00',
					},
					quantity: 4,
				},
				{
					product: {
						id: 6,
						short_name: 'Milk Cream Biscuit',
						long_name: 'Munchee Milk Cream Biscuit 255g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture3_tq0c3n',
						category: 'biscuit',
						price: '120.00',
					},
					quantity: 7,
				},
				{
					product: {
						id: 7,
						short_name: 'Nut Bars',
						long_name: 'Nice & Natural Chocolate Nut Bar 180g',
						product_image:
							'https://res.cloudinary.com/dtsbekuau/image/upload/v1/teclix/media/product/Picture4_vw01xi',
						category: 'cookies',
						price: '200.00',
					},
					quantity: 9,
				},
			],
		},
	];

	return (
		<Box h='calc(100vh - 200px)' w='80vw'>
			<Grid
				templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
				gap={1}
			>
				{vehiclesAssignments.map((vehiclesalesperson, index) => (
					<GridItem>
						<VehicleCard
							key={index}
							vehicle_type={vehiclesalesperson.vehicle.vehicle_type}
							vehicle_number={vehiclesalesperson.vehicle.vehicle_number}
							vehicle_model={vehiclesalesperson.vehicle.vehicle_model}
							vehicle_image={vehiclesalesperson.vehicle.vehicle_image}
							salesperson={vehiclesalesperson.salesperson}
							assigned_products={vehiclesalesperson.assigned_vehicle}
							id={vehiclesalesperson.vehicle.id}
							allsalespersons={salespersons}
							unassignedSalespersons={unassignedSalespersons}
							products={products}
						/>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

AssignedVehicles.propTypes = {};

export default AssignedVehicles;
