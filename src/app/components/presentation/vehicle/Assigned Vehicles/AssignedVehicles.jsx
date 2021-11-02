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
import VehicleCard from '../Assigned Vehicles/VehicleCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleAssignData } from '../../../../redux/actions/vehicleActions';
import { getSalespersonsAsync } from '../../../../redux/slices/salespersonSlice';
import { fetchProductData } from '../../../../redux/actions/productActions';
import LoadingCards from '../../../common/loading/LoadingCards';

const AssignedVehicles = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVehicleAssignData());
		dispatch(getSalespersonsAsync());
		dispatch(fetchProductData());
	}, [dispatch]);

	const { products } = useSelector((state) => state.products);
	const { salespersons } = useSelector((state) => state.salespersons);
	const { vehiclesAssignments, isLoading } = useSelector(
		(state) => state.vehiclesAssignments
	);

	const salespersonsId = new Map();
	vehiclesAssignments.forEach((v) => {
		salespersonsId.set(v.salesperson, v.id);
	});

	const unassignedSalespersons = [];
	salespersons
		.filter((sp) => sp.is_approved !== false)
		.forEach((s) => {
			if (!salespersonsId.get(s.id)) {
				unassignedSalespersons.push(s);
			}
		});

	return (
		<Box h='calc(100vh - 200px)' w='80vw'>
			{isLoading && <LoadingCards count={3} />}
			<Grid
				templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
				gap={1}
			>
				{!isLoading &&
					vehiclesAssignments &&
					vehiclesAssignments.map((vehiclesalesperson, index) => (
						<GridItem key={index}>
							<VehicleCard
								key={index}
								vehicle_type={vehiclesalesperson.vehicle.vehicle_type}
								vehicle_number={vehiclesalesperson.vehicle.vehicle_number}
								vehicle_model={vehiclesalesperson.vehicle.vehicle_model}
								vehicle_image={vehiclesalesperson.vehicle.vehicle_image}
								salesperson={vehiclesalesperson.salesperson}
								assigned_products={vehiclesalesperson.assigned_vehicle}
								id={vehiclesalesperson.vehicle.id}
								rowid={vehiclesalesperson.id}
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
