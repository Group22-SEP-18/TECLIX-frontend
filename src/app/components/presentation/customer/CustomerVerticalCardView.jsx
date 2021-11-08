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
	if (!customer) {
		return null;
	}
	return (
		<Center>
			<Box
				id='customer_vertical_card_div'
				w={'full'}
				borderWidth={1}
				boxShadow={'md'}
				rounded={'lg'}
				p={6}
				textAlign={'center'}
			>
				{/* shop profile picture */}
				<Avatar
					id='customer_vertical_card_div_profile_picture'
					size={'xl'}
					src={customer.profile_picture}
					alt={customer.shop_name}
					mb={4}
					pos={'relative'}
				/>
				{/* customer id */}
				<Text
					id='customer_vertical_card_div_customer_id'
					ml='4'
					px={4}
					py={1}
					fontWeight={'400'}
				>
					#Customer Id {customer.id}
				</Text>
				{/* shop name */}
				<Heading
					id='customer_vertical_card_div_shop_name'
					fontSize={'xl'}
					fontFamily={'body'}
					textAlign='center'
					pl='4'
				>
					{customer.shop_name}
				</Heading>
				{/* shop owner name */}
				<Text
					id='customer_vertical_card_div_owner_name'
					fontWeight={500}
					color={'gray.500'}
					textAlign='center'
					pl='4'
				>
					Owner: {customer.owner_first_name} {customer.owner_last_name}
				</Text>
				{/* email */}
				<Text
					id='customer_vertical_card_div_email'
					fontWeight={500}
					color={'gray.500'}
					textAlign='center'
					pl='4'
				>
					Email: {customer.email}
				</Text>
				{/* contact no */}
				<Text
					id='customer_vertical_card_div_contact_no'
					fontWeight={500}
					color={'gray.500'}
					textAlign='center'
					pl='4'
				>
					Mobile: {customer.contact_no}
				</Text>
				{/* address */}
				<Text
					id='customer_vertical_card_div_address'
					fontWeight={500}
					color={'gray.500'}
					textAlign='center'
					pl='4'
				>
					Address: {customer.street}, {customer.city}, {customer.district}
				</Text>
				{/* horizontal stack view for customer's outstanding and loyalty */}
				<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
					{/* outstanding */}
					<Stat>
						<StatLabel>Customer Outstanding</StatLabel>
						<StatNumber>Rs. {customer.outstanding}</StatNumber>
					</Stat>
					{/* loayalty points */}
					<Stat>
						<StatLabel>Customer Loyalty Points</StatLabel>
						<StatNumber>{customer.loyalty_points}</StatNumber>
					</Stat>
				</Stack>
				{/* map view for shop location */}

				<div id={`customer_vertical_card_div_map-${customer.id}`}>
					<MapWithHeader
						header='Location'
						height='400px'
						locations={[
							{
								latitude: parseFloat(customer.latitude),
								longitude: parseFloat(customer.longitude),
							},
						]}
					/>
				</div>
			</Box>
		</Center>
	);
};

CustomerVerticalCardView.propTypes = {
	customer: PropTypes.object,
};

export default CustomerVerticalCardView;
