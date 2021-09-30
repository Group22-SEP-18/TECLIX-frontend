/**
 * Summary.
 * Persentation of single a service order card  view.
 *
 * Description.
 *
 * @file   This files defines the service order card view.
 * @author Hirumal Priyashan.
 * @since  18.09.2021
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	HStack,
	Spacer,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Text,
} from '@chakra-ui/react';
import { getDateTime } from '../../../utils';

const ServiceOrderCard = ({ serviceOrder, showCustomer, showSP }) => {
	const datetime = getDateTime(serviceOrder.order_date);
	return (
		<div>
			<AccordionItem>
				<AccordionButton>
					<Box
						m={2}
						minH='100px'
						overflow='hidden'
						p={2}
						textAlign={'center'}
						_hover={{ cursor: 'pointer' }}
					>
						<HStack align={'center'}>
							<Box>
								<Text fontWeight={500} mb={4} textAlign='start' pl='4'>
									Order Id {serviceOrder.id}
								</Text>
								{showSP && (
									<Text
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
										fontWeight={500}
										color={'gray.500'}
										textAlign='start'
										pl='4'
									>
										Customer: {serviceOrder.customer.shop_name}
									</Text>
								)}
								<Text
									fontWeight={500}
									color={'gray.500'}
									textAlign='start'
									pl='4'
								>
									Date: {datetime.day} {datetime.time}
								</Text>
								<Text
									fontWeight={500}
									color={'gray.500'}
									textAlign='start'
									pl='4'
								>
									Price: Rs.{serviceOrder.original_price}
								</Text>
								<Text
									fontWeight={500}
									color={'gray.500'}
									mb={4}
									textAlign='start'
									pl='4'
								>
									Discount: Rs. {serviceOrder.discount}
								</Text>
							</Box>
						</HStack>
					</Box>
					<Spacer />
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					<Table>
						{serviceOrder.order_items.length ? (
							<>
								<Thead>
									<Tr>
										<Th>Product</Th>
										<Th isNumeric>Quantity</Th>
										<Th isNumeric>Single Unit Price(Rs.)</Th>
										<Th isNumeric>Price (Rs.)</Th>
									</Tr>
								</Thead>
								<Tbody>
									{serviceOrder.order_items.map((p) => (
										<Tr>
											<Td>{p.product.short_name}</Td>
											<Td isNumeric>{p.quantity}</Td>
											<Td isNumeric>{p.price_at_the_time}</Td>
											<Td isNumeric>{p.price_at_the_time * p.quantity}</Td>
										</Tr>
									))}
								</Tbody>
							</>
						) : (
							'No products are included'
						)}
					</Table>
				</AccordionPanel>
			</AccordionItem>
		</div>
	);
};

ServiceOrderCard.propTypes = { serviceOrder: PropTypes.object };

export default ServiceOrderCard;
