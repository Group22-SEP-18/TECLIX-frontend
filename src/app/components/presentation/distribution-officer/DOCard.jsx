/**
 * Summary.
 * Persentation of single a customer card view.
 *
 * Description.
 *
 * @file   This files defines the single a customer card view.
 * @author Hirumal Priyashan.
 * @since  17.09.2021
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Badge,
	Box,
	Button,
	Heading,
	HStack,
	Spacer,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { approveDOAccount, rejectDOAccount } from '../../../../api/staffApi';

const DOCard = ({ dOfficer, onRejectSuccess, onApproveSuccess }) => {
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
	const approveAccount = async () => {
		setIsLoading({
			approve: true,
			reject: false,
		});
		try {
			const result = await approveDOAccount(dOfficer.id);

			if (result.is_approved) {
				showToast(
					'Account Approved.',
					'success',
					'Successfully approved the account'
				);
				onApproveSuccess(dOfficer.id);
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
			const result = await rejectDOAccount(dOfficer.id);

			if (!result.is_approved) {
				showToast(
					'Account Rejected.',
					'success',
					'Account rejection successful'
				);
				onRejectSuccess(dOfficer.id);
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
	if (!dOfficer) {
		return null;
	}
	return (
		<div>
			<Box
				id={`dOfficer-card-div-${dOfficer.id}`}
				borderRadius='lg'
				boxShadow='lg'
				m={4}
				minH='150px'
				overflow='hidden'
				p={6}
				textAlign={'center'}
				_hover={
					dOfficer.is_approved ? { cursor: 'pointer', bg: 'lightgrey' } : {}
				}
			>
				<HStack align={'center'}>
					<Avatar
						size={'xl'}
						src={dOfficer.profile_picture}
						alt={dOfficer.first_name}
						mb={4}
						pos={'relative'}
					/>
					<Box>
						<Heading
							id={`dOfficer_name-${dOfficer.id}`}
							fontSize={'xl'}
							fontFamily={'body'}
							textAlign='start'
							pl='4'
						>
							{dOfficer.first_name} {dOfficer.last_name}
							<Badge
								id={`dOfficer_id-${dOfficer.id}`}
								ml='4'
								px={4}
								py={1}
								colorScheme='green'
								fontWeight={'400'}
							>
								#Employee Id {dOfficer.employee_no}
							</Badge>
						</Heading>
						<Text
							id={`dOfficer_email-${dOfficer.id}`}
							fontWeight={500}
							textAlign='start'
							pl='4'
						>
							Email: {dOfficer.email}
						</Text>
						<Text
							id={`dOfficer_contact_no-${dOfficer.id}`}
							fontWeight={500}
							textAlign='start'
							pl='4'
						>
							Mobile: {dOfficer.contact_no}
						</Text>
					</Box>
					<Spacer />
					{!dOfficer.is_approved && (
						<Box>
							<VStack>
								<Spacer />
								<Button
									id={`dOfficer_reject_button-${dOfficer.id}`}
									leftIcon={<CloseIcon />}
									colorScheme='red'
									variant='solid'
									isLoading={isLoading.reject}
									onClick={rejectAccount}
								>
									Reject
								</Button>
								<Button
									id={`dOfficer_approve_button-${dOfficer.id}`}
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

DOCard.propTypes = {
	customer: PropTypes.object,
};

export default DOCard;
