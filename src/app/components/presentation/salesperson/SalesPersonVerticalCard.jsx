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
	Wrap,
	Badge,
	useColorModeValue,
} from '@chakra-ui/react';
import MapWithHeader from '../../common/map/MapWithHeader';
import { selectLeaderboard } from '../../../redux/slices/leaderboardSlice';
import { selectAllLocations } from '../../../redux/slices/locationsSlice';

const SalesPersonVerticalCard = ({ salesperson }) => {
	const { locations } = useSelector(selectAllLocations);
	const { todayLeaderboard } = useSelector(selectLeaderboard);
	const lastLocations = locations
		.slice()
		.filter((l) => l.salesperson.employee_no === salesperson.employee_no)
		.sort((a, b) => a.date.localeCompare(b.date))
		.reverse();
	const lastLocation = lastLocations.length > 0 ? lastLocations[0] : null;
	var todayPoints = 0;
	var monthlyPoints = 0;
	var alltimePoints = 0;
	for (let j = 0; j < todayLeaderboard.length; j++) {
		if (salesperson.id === todayLeaderboard[j].salesperson.id) {
			todayPoints = todayLeaderboard[j].points_today;
			monthlyPoints = todayLeaderboard[j].points_current_month;
			alltimePoints = todayLeaderboard[j].points_all_time;
		}
	}
	return (
		<Center>
			<Box
				id={`salesperson-vertical-card-div-${salesperson.id}`}
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
				<Text
					id={`salesperson_id-${salesperson.id}`}
					ml='4'
					px={4}
					py={1}
					fontWeight={'400'}
				>
					#Emplooyee Id {salesperson.employee_no}
				</Text>
				<Heading
					id={`salesperson_name-${salesperson.id}`}
					fontSize={'xl'}
					fontFamily={'body'}
					textAlign='center'
					pl='4'
				>
					{salesperson.first_name} {salesperson.last_name}
				</Heading>
				<Text
					id={`salesperson_email-${salesperson.id}`}
					fontWeight={500}
					color={'gray.500'}
					textAlign='center'
					pl='4'
				>
					{salesperson.email}
				</Text>
				<Text
					id={`salesperson_mobile_no-${salesperson.id}`}
					fontWeight={500}
					color={'gray.500'}
					mb={4}
					textAlign='center'
					pl='4'
				>
					{salesperson.mobile_no}
				</Text>

				<Wrap align={'center'} justify={'center'} direction={'row'} mt={6}>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#Today: {todayPoints} points
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#Month: {monthlyPoints} points
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#All Time: {alltimePoints} points
					</Badge>
				</Wrap>

				<div id={`salesperson_map-${salesperson.id}`}>
					<MapWithHeader
						header='Last Location'
						height='400px'
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
				</div>
			</Box>
		</Center>
	);
};

export default SalesPersonVerticalCard;
