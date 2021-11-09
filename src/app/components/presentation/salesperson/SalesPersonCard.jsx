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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	approveSalespersonAccount,
	rejectSalespersonAccount,
} from '../../../../api/salespersonApi';
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
import { capitalize } from 'lodash';

const SalesPersonCard = ({
	salesperson,
	onClick,
	leaderboard,
	onRejectSuccess,
	onApproveSuccess,
}) => {
	const toast = useToast();
	const [isLoading, setIsLoading] = useState({
		approve: false,
		reject: false,
	});
	const showToast = (title, status, description) =>
		toast({
			position: 'bottom-right',
			title: title,
			description: description,
			status: status,
			duration: 5000,
			isClosable: true,
		});
	var todayPoints = 0;
	var monthlyPoints = 0;
	var alltimePoints = 0;
	for (let j = 0; j < leaderboard.length; j++) {
		if (salesperson.id === leaderboard[j].salesperson.id) {
			todayPoints = leaderboard[j].points_today;
			monthlyPoints = leaderboard[j].points_current_month;
			alltimePoints = leaderboard[j].points_all_time;
		}
	}
	const approveAccount = async () => {
		setIsLoading({
			approve: true,
			reject: false,
		});
		try {
			const result = await approveSalespersonAccount(salesperson.id);

			if (result.is_approved) {
				showToast(
					'Account Approved.',
					'success',
					'Successfully approved the account'
				);
				onApproveSuccess(salesperson.id);
			} else {
				showToast('An error occurred.', 'error', 'Account approval failed');
			}
		} catch (error) {
			showToast('An error occurred.', 'error', 'Account approval failed');
		}
		setIsLoading({
			approve: false,
			reject: false,
		});
	};
	const rejectAccount = async () => {
		setIsLoading({
			approve: false,
			reject: true,
		});
		try {
			const result = await rejectSalespersonAccount(salesperson.id);

			if (!result.is_approved) {
				showToast(
					'Account Rejected.',
					'success',
					'Account rejection successful'
				);
				onRejectSuccess(salesperson.id);
			} else {
				showToast('An error occurred.', 'error', 'Account rejection failed');
			}
		} catch (error) {
			showToast('An error occurred.', 'error', 'Account rejection failed');
		}
		setIsLoading({
			approve: false,
			reject: false,
		});
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
							{capitalize(salesperson.first_name)}{' '}
							{capitalize(salesperson.last_name)}
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
										#Today: {todayPoints} points
									</Badge>
									<Badge
										px={2}
										py={1}
										variant='outline'
										colorScheme='green'
										fontWeight={'400'}
									>
										#Month: {monthlyPoints} points
									</Badge>
									<Badge
										px={2}
										py={1}
										variant='outline'
										colorScheme='green'
										fontWeight={'400'}
									>
										#All Time: {alltimePoints} points
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
									isLoading={isLoading.reject}
									onClick={rejectAccount}
								>
									Reject
								</Button>
								<Button
									id={`salesperson_approve_button-${salesperson.id}`}
									leftIcon={<CheckIcon />}
									colorScheme='whatsapp'
									variant='solid'
									isLoading={isLoading.approve}
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
