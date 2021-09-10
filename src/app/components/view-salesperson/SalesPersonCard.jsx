/**
 * Summary.
 * Persentation of single a salesPerson card view.
 *
 * Description.
 *
 * @file   This files defines the single a salesPerson card view.
 * @author Hirumal Priyashan.
 * @since  09.09.2021
 */

import React from 'react';
import {
	Avatar,
	Badge,
	Box,
	Heading,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react';

const SalesPersonCard = ({ salesperson, key }) => {
	return (
		<div key={key}>
			<Box
				borderRadius='lg'
				boxShadow='lg'
				m={4}
				minH='150px'
				overflow='hidden'
				p={6}
				textAlign={'center'}
			>
				<HStack align={'center'}>
					<Avatar
						size={'xl'}
						src={salesperson.profile_picture}
						alt={salesperson.first_name}
						mb={4}
						pos={'relative'}
					/>
					<Box>
						<Heading
							fontSize={'xl'}
							fontFamily={'body'}
							textAlign='start'
							pl='4'
						>
							{salesperson.first_name} {salesperson.last_name}
							<Badge
								ml='4'
								px={4}
								py={1}
								colorScheme='green'
								fontWeight={'400'}
							>
								#Emplooyee Id {salesperson.emp_id}
							</Badge>
						</Heading>
						<Text
							fontWeight={500}
							color={'gray.500'}
							mb={4}
							textAlign='start'
							pl='4'
						>
							{salesperson.email}
						</Text>
						<Text mt={6} pl='4' textAlign='start'>
							Leaderboard Points
						</Text>
						<Stack align={'center'} justify={'start'} direction={'row'} pl='4'>
							<Badge
								px={2}
								py={1}
								variant='outline'
								colorScheme='green'
								fontWeight={'400'}
							>
								#Today: {salesperson.leaderboard_points.today} points
							</Badge>
							<Badge
								px={2}
								py={1}
								variant='outline'
								colorScheme='green'
								fontWeight={'400'}
							>
								#Month: {salesperson.leaderboard_points.month} points
							</Badge>
							<Badge
								px={2}
								py={1}
								variant='outline'
								colorScheme='green'
								fontWeight={'400'}
							>
								#All Time: {salesperson.leaderboard_points.alltime} points
							</Badge>
						</Stack>
					</Box>
				</HStack>
			</Box>
		</div>
	);
};

SalesPersonCard.propTypes = {};

export default SalesPersonCard;
