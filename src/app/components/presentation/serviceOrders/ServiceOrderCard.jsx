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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
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
import {
	getSalespersonsAsync,
	selectAllSalespersons,
} from '../../../redux/slices/salespersonSlice';
import { getDateTime, formatPrice } from '../../../utils';

const ServiceOrderCard = ({ serviceOrder, customer }) => {
	const dispatch = useDispatch();
	const salesperson = useSelector(selectAllSalespersons)
		.slice()
		.find((s) => s.emp_id === serviceOrder.salesperson_id);
	console.log(salesperson);
	useEffect(() => {
		dispatch(getSalespersonsAsync());
	}, [dispatch]);
	const datetime = getDateTime(serviceOrder.date);
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
									Order Id {serviceOrder.order_id}
								</Text>
								<Text
									fontWeight={500}
									color={'gray.500'}
									textAlign='start'
									pl='4'
								>
									SalesPerson: {salesperson.first_name} {salesperson.last_name}
								</Text>
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
									Price: {formatPrice(serviceOrder.actual_price)}
								</Text>
								<Text
									fontWeight={500}
									color={'gray.500'}
									mb={4}
									textAlign='start'
									pl='4'
								>
									Discount: {formatPrice(serviceOrder.discount)}
								</Text>
							</Box>
						</HStack>
					</Box>
					<Spacer />
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
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
							{serviceOrder.products.map((p) => (
								<Tr>
									<Td>{p.product_id}</Td>
									<Td isNumeric>{p.quantity}</Td>
									<Td isNumeric>{p.item_price}</Td>
									<Td isNumeric>{p.item_price * p.quantity}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</AccordionPanel>
			</AccordionItem>
		</div>
	);
};

ServiceOrderCard.propTypes = { serviceOrder: PropTypes.object };

export default ServiceOrderCard;
