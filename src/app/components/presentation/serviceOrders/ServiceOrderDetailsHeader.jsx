/**
 * Summary.
 * Persentation of single a service order products view header.
 *
 * Description.
 *
 * @file   This files defines the service order view header.
 * @author Hirumal Priyashan.
 * @since  18.09.2021
 */
import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import { getDateTime } from '../../../utils';

const ServiceOrderDetailsHeader = ({ serviceOrder, showSP, showCustomer }) => {
	if (!serviceOrder || (showCustomer && showSP) || (!showCustomer && !showSP)) {
		return null;
	}
	const datetime = getDateTime(serviceOrder.order_date);
	return (
		<HStack align={'center'}>
			<Box>
				<Text
					id={`serviceorder_order_id-${serviceOrder.id}`}
					fontWeight={500}
					mb={4}
					textAlign='start'
					pl='4'
				>
					Order Id {serviceOrder.id}
				</Text>
				{showSP && (
					<Text
						id={`serviceorder_order_salesperson-${serviceOrder.id}`}
						fontWeight={500}
						color={'gray.500'}
						textAlign='start'
						pl='4'
					>
						SalesPerson: {serviceOrder.salesperson.first_name}{' '}
						{serviceOrder.salesperson.last_name}
					</Text>
				)}
				{showCustomer && (
					<Text
						id={`serviceorder_order_customer-${serviceOrder.id}`}
						fontWeight={500}
						color={'gray.500'}
						textAlign='start'
						pl='4'
					>
						Customer: {serviceOrder.customer.shop_name}
					</Text>
				)}
				<Text
					id={`serviceorder_order_date-${serviceOrder.id}`}
					fontWeight={500}
					color={'gray.500'}
					textAlign='start'
					pl='4'
				>
					Date: {datetime.day} {datetime.time}
				</Text>
				<Text
					id={`serviceorder_order_price-${serviceOrder.id}`}
					fontWeight={500}
					color={'gray.500'}
					textAlign='start'
					pl='4'
				>
					Price: Rs.{serviceOrder.original_price}
				</Text>
				<Text
					id={`serviceorder_order_discount-${serviceOrder.id}`}
					fontWeight={500}
					color={'gray.500'}
					mb={4}
					textAlign='start'
					pl='4'
				>
					Discount: Rs.{serviceOrder.discount}
				</Text>
			</Box>
		</HStack>
	);
};

export default ServiceOrderDetailsHeader;
