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
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { approveAccountById } from '../../../redux/actions/salespersonActions';
import {
	Avatar,
	Badge,
	Box,
	Button,
	Heading,
	HStack,
	Spacer,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const SalesPersonCard = ({ salesperson, onClick }) => {
	const dispatch = useDispatch();
	const { isLoading, success, error, id } = useSelector(
		(state) => state.salespersons.approve
	);
	const approveAccount = () => {
		console.log(salesperson.id);
		dispatch(approveAccountById(salesperson.id));
	};
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
				_hover={
					salesperson.is_approved ? { cursor: 'pointer', bg: 'lightgrey' } : {}
				}
				onClick={() => (salesperson.is_approved ? onClick(salesperson) : {})}
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
								#Emplooyee Id {salesperson.employee_no}
							</Badge>
						</Heading>
						<Text
							fontWeight={500}
							color={'gray.500'}
							mt={4}
							textAlign='start'
							pl='4'
						>
							Email: {salesperson.email}
						</Text>
						<Text
							fontWeight={500}
							color={'gray.500'}
							mb={4}
							textAlign='start'
							pl='4'
						>
							Contact No: {salesperson.contact_no}
						</Text>
						{salesperson.is_approved && (
							<>
								<Text mt={6} pl='4' textAlign='start'>
									Leaderboard Points
								</Text>
								<Stack
									align={'center'}
									justify={'start'}
									direction={'row'}
									pl='4'
								>
									<Badge
										px={2}
										py={1}
										variant='outline'
										colorScheme='green'
										fontWeight={'400'}
									>
										#Today: points
									</Badge>
									<Badge
										px={2}
										py={1}
										variant='outline'
										colorScheme='green'
										fontWeight={'400'}
									>
										#Month: points
									</Badge>
									<Badge
										px={2}
										py={1}
										variant='outline'
										colorScheme='green'
										fontWeight={'400'}
									>
										#All Time: points
									</Badge>
								</Stack>
							</>
						)}
					</Box>
					<Spacer />
					{!salesperson.is_approved && (
						<Box>
							<VStack>
								<Spacer />
								<Button
									leftIcon={<CheckIcon />}
									colorScheme='whatsapp'
									variant='solid'
									isLoading={isLoading && id === salesperson.id}
									onClick={approveAccount}
								>
									Approve
								</Button>
								{/* <Button
									rightIcon={<ArrowForwardIcon />}
									colorScheme='teal'
									variant='outline'
								>
									Reject
								</Button> */}
							</VStack>
						</Box>
					)}
				</HStack>
			</Box>
		</div>
	);
};

SalesPersonCard.propTypes = {
	salesperson: PropTypes.object,
	onClick: PropTypes.func,
};

export default SalesPersonCard;
