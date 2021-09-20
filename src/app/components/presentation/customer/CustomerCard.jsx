/**
 * Summary.
 * Persentation of single a customer card view.
 *
 * Description.
 *
 * @file   This files defines the single a customer card view.
 * @author Hirumal Priyashan.
 * @since  17.09.2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Badge,
	Box,
	Heading,
	HStack,
	Spacer,
	Text,
	VStack,
} from '@chakra-ui/react';

const CustomerCard = ({ customer, onClick }) => {
	return (
		<div>
			<Box
				borderRadius='lg'
				boxShadow='lg'
				m={4}
				minH='150px'
				overflow='hidden'
				p={6}
				textAlign={'center'}
				_hover={{ cursor: 'pointer', bg: 'lightgrey' }}
				onClick={() => onClick(customer)}
			>
				<HStack align={'center'}>
					<Avatar
						size={'xl'}
						src={customer.profile_picture}
						alt={customer.shop_name}
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
							{customer.shop_name}
							<Badge
								ml='4'
								px={4}
								py={1}
								colorScheme='green'
								fontWeight={'400'}
							>
								#Customer Id {customer.customer_id}
							</Badge>
						</Heading>
						<Text
							fontWeight={500}
							color={'gray.500'}
							mb={4}
							textAlign='start'
							pl='4'
						>
							Owner: {customer.owner_first_name} {customer.owner_last_name}
						</Text>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Email: {customer.email}
						</Text>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Mobile: {customer.email}
						</Text>
						<Text fontWeight={500} mb={4} textAlign='start' pl='4'>
							Address: {customer.address.street}, {customer.address.city},{' '}
							{customer.address.district}
						</Text>
					</Box>
					<Spacer />
					<VStack>
						<Badge
							justifyContent='start'
							px={2}
							py={1}
							variant='outline'
							colorScheme='green'
							fontWeight={'400'}
						>
							#Loyalty: {customer.loyalty_points} points
						</Badge>
					</VStack>
				</HStack>
			</Box>
		</div>
	);
};

CustomerCard.propTypes = {
	customer: PropTypes.object,
	onClick: PropTypes.func,
};

export default CustomerCard;
