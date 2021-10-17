import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import UnAssignedVehicleCard from '../../presentation/vehicle/UnAssignedVehicleCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicleAssignData } from '../../../redux/actions/vehicleActions';
import { fetchVehicleData } from '../../../redux/actions/vehicleActions';
import { getSalespersonsAsync } from '../../../redux/slices/salespersonSlice';
import { fetchProductData } from '../../../redux/actions/productActions';

const UnAssignedVehicles = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchVehicleAssignData());
	}, [dispatch]);
	useEffect(() => {
		dispatch(getSalespersonsAsync());
	}, [dispatch]);
	useEffect(() => {
		dispatch(fetchProductData());
	}, [dispatch]);
	useEffect(() => {
		dispatch(fetchVehicleData());
	}, [dispatch]);

	const { vehicles } = useSelector((state) => state.vehicles);
	const { products } = useSelector((state) => state.products);
	const { salespersons } = useSelector((state) => state.salespersons);
	const { vehiclesAssignments } = useSelector(
		(state) => state.vehiclesAssignments
	);

	const vehicleId = new Map();
	vehiclesAssignments.forEach((v) => {
		vehicleId.set(v.vehicle.id, v.id);
	});

	const unassignedVehicles = [];
	vehicles.forEach((s) => {
		if (!vehicleId.get(s.id)) {
			unassignedVehicles.push(s);
		}
	});

	return (
		<Box h='calc(100vh - 200px)' w='80vw'>
			<Grid
				templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
				gap={1}
			>
				{unassignedVehicles.map((vehicle, index) => (
					<GridItem>
						<UnAssignedVehicleCard
							key={index}
							vehicle_type={vehicle.vehicle_type}
							vehicle_number={vehicle.vehicle_number}
							vehicle_model={vehicle.vehicle_model}
							vehicle_image={vehicle.vehicle_image}
							id={vehicle.id}
							// allsalespersons={salespersons}
							// unassignedVehicles={unassignedVehicles}
							// products={products}
						/>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

UnAssignedVehicles.propTypes = {};

export default UnAssignedVehicles;
