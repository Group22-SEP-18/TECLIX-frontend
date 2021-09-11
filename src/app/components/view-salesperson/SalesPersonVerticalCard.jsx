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
import SimpleMap from '../map/SimpleMap';

const SalesPersonVerticalCardView = ({ salesperson }) => {
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
					#Emplooyee Id {salesperson.emp_id}
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
					{salesperson.mobile_number}
				</Text>

				<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#Today: {salesperson.leaderboard_points.today} points
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#Month: {salesperson.leaderboard_points.month} points
					</Badge>
					<Badge
						px={2}
						py={1}
						bg={useColorModeValue('gray.50', 'gray.800')}
						fontWeight={'400'}
					>
						#All Time: {salesperson.leaderboard_points.alltime} points
					</Badge>
				</Stack>

				<Text
					fontWeight={500}
					color={'gray.500'}
					my={4}
					textAlign='start'
					pl='4'
				>
					Current Location
				</Text>
				<Box
					maxW='100%'
					maxH='100%'
					borderWidth='1px'
					borderRadius='xl'
					overflow='hidden'
				>
					<SimpleMap />
				</Box>
			</Box>
		</Center>
	);
};

export default SalesPersonVerticalCardView;
