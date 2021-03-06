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
import { capitalizeFirstLetter } from '../../../utils';

const CustomerCard = ({ customer, onClick }) => {
	if (!customer) {
		return null;
	}
	return (
		<div>
			<Box
				id={`customer-card-div-${customer.id}`}
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
						id='profile_picture'
						size={'xl'}
						src={customer.profile_picture}
						alt={customer.shop_name}
						mb={4}
						pos={'relative'}
					/>
					<Box>
						<Heading
							id='shop_name'
							fontSize={'xl'}
							fontFamily={'body'}
							textAlign='start'
							pl='4'
						>
							{capitalizeFirstLetter(customer.shop_name)}
							<Badge
								id='customer_id'
								ml='4'
								px={4}
								py={1}
								colorScheme='green'
								fontWeight={'400'}
							>
								#Customer Id {customer.id}
							</Badge>
						</Heading>
						<Text
							id='owner_name'
							fontWeight={500}
							color={'gray.500'}
							mb={4}
							textAlign='start'
							pl='4'
						>
							Owner: {capitalizeFirstLetter(customer.owner_first_name)}{' '}
							{capitalizeFirstLetter(customer.owner_last_name)}
						</Text>
						<Text id='email' fontWeight={500} textAlign='start' pl='4'>
							Email: {customer.email}
						</Text>
						<Text id='contact_no' fontWeight={500} textAlign='start' pl='4'>
							Mobile: {customer.contact_no}
						</Text>
						<Text id='address' fontWeight={500} mb={4} textAlign='start' pl='4'>
							Address: {capitalizeFirstLetter(customer.street)},{' '}
							{capitalizeFirstLetter(customer.city)},{' '}
							{capitalizeFirstLetter(customer.district)}
						</Text>
					</Box>
					<Spacer />
					<VStack>
						<Badge
							id='loyalty_points'
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
