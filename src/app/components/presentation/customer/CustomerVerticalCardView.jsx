/**
 * Summary.
 * Persentation of single customer vertical card view
 * with
 * 	- header
 * 	- sidebar
 *
 * Description.
 *
 * @file   This files defines the single customer vertical card view.
 * @author Hirumal Priyashan.
 * @since  17.09.2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
	Heading,
	Avatar,
	Box,
	Center,
	Text,
	Stack,
	Stat,
	StatLabel,
	StatNumber,
} from '@chakra-ui/react';
import MapWithHeader from '../../common/map/MapWithHeader';

const CustomerVerticalCardView = ({ customer }) => {
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
					src={customer.profile_picture}
					alt={customer.shop_name}
					mb={4}
					pos={'relative'}
				/>
				<Text ml='4' px={4} py={1} fontWeight={'400'}>
					#Customer Id {customer.customer_id}
				</Text>
				<Heading fontSize={'xl'} fontFamily={'body'} textAlign='center' pl='4'>
					{customer.shop_name}
				</Heading>
				<Text fontWeight={500} color={'gray.500'} textAlign='center' pl='4'>
					Owner: {customer.owner_first_name} {customer.owner_last_name}
				</Text>
				<Text fontWeight={500} color={'gray.500'} textAlign='center' pl='4'>
					Email: {customer.email}
				</Text>
				<Text fontWeight={500} color={'gray.500'} textAlign='center' pl='4'>
					Mobile: {customer.contact_no}
				</Text>
				<Text fontWeight={500} color={'gray.500'} textAlign='center' pl='4'>
					Address: {customer.street}, {customer.city}, {customer.district}
				</Text>
				<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
					<Stat>
						<StatLabel>Customer Outstanding</StatLabel>
						<StatNumber>Rs. {customer.outstanding}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Customer Loyalty Points</StatLabel>
						<StatNumber>{customer.loyalty_points}</StatNumber>
					</Stat>
				</Stack>

				<MapWithHeader
					header='Location'
					locations={[
						{
							latitude: parseFloat(customer.latitude),
							longitude: parseFloat(customer.longitude),
						},
					]}
				/>
			</Box>
		</Center>
	);
};

CustomerVerticalCardView.propTypes = {
	customer: PropTypes.object,
};

export default CustomerVerticalCardView;
