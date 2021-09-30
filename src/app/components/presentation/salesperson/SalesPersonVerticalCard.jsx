/**
 * Summary.
 * Persentation of single sales person vertical card view
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines the single sales person vertical card view.
 * @author Hirumal Priyashan.
 * @since  10.09.2021
 */

import React from 'react';
import { useSelector } from 'react-redux';
import {
	Heading,
	Avatar,
	Box,
	Center,
	Text,
	Stack,
	Badge,
	useColorModeValue,
} from '@chakra-ui/react';
import MapWithHeader from '../../common/map/MapWithHeader';
import { selectAllLocations } from '../../../redux/slices/locationsSlice';

const SalesPersonVerticalCardView = ({ salesperson }) => {
	const { locations } = useSelector(selectAllLocations);
	const lastLocations = locations
		.slice()
		.filter((l) => l.salesperson.employee_no === salesperson.employee_no)
		.sort((a, b) => a.date.localeCompare(b.date))
		.reverse();
	const lastLocation = lastLocations.length > 0 ? lastLocations[0] : null;
	return (
		<Center>
			<Box
				w={'full'}
				borderWidth={1}
				boxShadow={'md'}
				rounded={'lg'}
				p={6}
				textAlign={'center'}
			>
				<Avatar
					size={'xl'}
					src={salesperson.profile_picture}
					alt={salesperson.first_name}
					mb={4}
					pos={'relative'}
				/>
				<Text ml='4' px={4} py={1} fontWeight={'400'}>
					#Emplooyee Id {salesperson.employee_no}
				</Text>
				<Heading fontSize={'xl'} fontFamily={'body'} textAlign='center' pl='4'>
					{salesperson.first_name} {salesperson.last_name}
				</Heading>
				<Text fontWeight={500} color={'gray.500'} textAlign='center' pl='4'>
					{salesperson.email}
				</Text>
				<Text
					fontWeight={500}
					color={'gray.500'}
					mb={4}
					textAlign='center'
					pl='4'
				>
					{salesperson.mobile_no}
				</Text>

				<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#Today: points
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#Month: points
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#All Time: points
					</Badge>
				</Stack>

				<MapWithHeader
					header='Last Location'
					locations={
						lastLocation
							? [
									{
										latitude: parseFloat(lastLocation.customer.latitude),
										longitude: parseFloat(lastLocation.customer.longitude),
									},
							  ]
							: []
					}
				/>
			</Box>
		</Center>
	);
};

export default SalesPersonVerticalCardView;
