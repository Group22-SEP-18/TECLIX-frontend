/**
 * Summary.
 * Persentation of single a service order products table  view.
 *
 * Description.
 *
 * @file   This files defines the service order table view.
 * @author Hirumal Priyashan.
 * @since  18.09.2021
 */

import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const ServiceOrderProductTable = ({ order_items = [] }) => {
	return order_items.length ? (
		<Table>
			<Thead>
				<Tr>
					<Th>Product</Th>
					<Th isNumeric>Quantity</Th>
					<Th isNumeric>Single Unit Price(Rs.)</Th>
					<Th isNumeric>Price (Rs.)</Th>
				</Tr>
			</Thead>
			<Tbody>
				{order_items.map((p) => (
					<Tr>
						<Td>{p.product.short_name}</Td>
						<Td isNumeric>{p.quantity}</Td>
						<Td isNumeric>{p.price_at_the_time}</Td>
						<Td isNumeric>{p.price_at_the_time * p.quantity}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	) : (
		'No products are included'
	);
};

export default ServiceOrderProductTable;
