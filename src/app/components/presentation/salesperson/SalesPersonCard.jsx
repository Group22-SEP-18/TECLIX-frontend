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
	const showToast = (title, status, description) =>
		toast({
			position: 'bottom-right',
			title: title,
			description: description,
			status: status,
			duration: 5000,
			isClosable: true,
		});
	const approveAccount = async () => {
		await dispatch(approveAccountById(salesperson.id));
		setTimeout(() => {
			if (approve.success === 'Successfully approved the account') {
				showToast('Account Approved.', 'success', approve.success);
			}
			if (approve.error === 'Account activation failed') {
				showToast('An error occurred.', 'error', approve.error);
			}
		}, 500);
	};
	const rejectAccount = async () => {
		await dispatch(rejectAccountById(salesperson.id));
		setTimeout(() => {
			if (reject.success === 'Account rejection successful') {
				showToast('Account Rejected.', 'success', reject.success);
			}
			if (reject.error === 'Account rejection failed') {
				showToast('An error occurred.', 'error', reject.error);
			}
		}, 500);
	};
	if (!salesperson) {
		return null;
	}
	return (
		<div>
			<Box
				id={`salesperson-card-div-${salesperson.id}`}
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
							id={`salesperson_name-${salesperson.id}`}
							fontSize={'xl'}
							fontFamily={'body'}
							textAlign='start'
							pl='4'
						>
							{salesperson.first_name} {salesperson.last_name}
							<Badge
								id={`salesperson_id-${salesperson.id}`}
								ml='4'
								px={4}
								py={1}
								colorScheme='green'
								fontWeight={'400'}
							>
								#Employee Id {salesperson.employee_no}
							</Badge>
						</Heading>
						<Text
							id={`salesperson_email-${salesperson.id}`}
							fontWeight={500}
							color={'gray.500'}
							mt={4}
							textAlign='start'
							pl='4'
						>
							Email: {salesperson.email}
						</Text>
						<Text
							id={`salesperson_contact_no-${salesperson.id}`}
							fontWeight={500}
							color={'gray.500'}
							mb={4}
							textAlign='start'
							pl='4'
						>
							Mobile: {salesperson.contact_no}
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
									id={`salesperson_reject_button-${salesperson.id}`}
									rightIcon={<CloseIcon />}
									colorScheme='red'
									variant='solid'
									isLoading={reject.isLoading && reject.id === salesperson.id}
									onClick={rejectAccount}
								>
									Reject
								</Button>
								<Button
									id={`salesperson_approve_button-${salesperson.id}`}
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
