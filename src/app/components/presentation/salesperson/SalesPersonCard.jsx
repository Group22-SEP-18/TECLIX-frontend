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
import {
	approveAccountById,
	rejectAccountById,
} from '../../../redux/actions/salespersonActions';
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
	useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const SalesPersonCard = ({ salesperson, onClick }) => {
	const dispatch = useDispatch();
	const toast = useToast();
	const approve = useSelector((state) => state.salespersons.approve);
	const reject = useSelector((state) => state.salespersons.reject);
	const approveAccount = async () => {
		await dispatch(approveAccountById(salesperson.id));
		setTimeout(() => {
			if (approve.success === 'Successfully approved the account') {
				toast({
					title: 'Account Approved.',
					description: approve.success,
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			} else {
				toast({
					title: 'An error occurred.',
					description: approve.error,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		}, 500);
	};
	const rejectAccount = async () => {
		await dispatch(rejectAccountById(salesperson.id));
		setTimeout(() => {
			if (reject.success === 'Account rejection successful') {
				toast({
					title: 'Account Rejected.',
					description: reject.success,
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
			}
			if (reject.error === 'Account rejection failed') {
				toast({
					title: 'An error occurred.',
					description: reject.error,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		}, 500);
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
									rightIcon={<CloseIcon />}
									colorScheme='teal'
									variant='solid'
									isLoading={reject.isLoading && reject.id === salesperson.id}
									onClick={rejectAccount}
								>
									Reject
								</Button>
								<Button
									leftIcon={<CheckIcon />}
									colorScheme='whatsapp'
									variant='solid'
									isLoading={approve.isLoading && approve.id === salesperson.id}
									onClick={approveAccount}
								>
									Approve
								</Button>
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
