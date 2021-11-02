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

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
import {
	approveAccountById,
	rejectAccountById,
} from '../../../redux/actions/doActions';

const DOCard = ({ dOfficer }) => {
	const dispatch = useDispatch();
	const toast = useToast();
	const approve = useSelector((state) => state.distributionOfficers.approve);
	const reject = useSelector((state) => state.distributionOfficers.reject);
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
		const result = await dispatch(approveAccountById(dOfficer.id));
		if (result) {
			showToast('Account Approved.', 'success', approve.success);
		} else {
			showToast('An error occurred.', 'error', approve.error);
		}
	};
	const rejectAccount = async () => {
		const result = await dispatch(rejectAccountById(dOfficer.id));
		if (result) {
			showToast('Account Rejected.', 'success', reject.success);
		} else {
			showToast('An error occurred.', 'error', reject.error);
		}
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
									isLoading={reject.isLoading && reject.id === dOfficer.id}
									onClick={rejectAccount}
								>
									Reject
								</Button>
								<Button
									id={`dOfficer_approve_button-${dOfficer.id}`}
									leftIcon={<CheckIcon />}
									colorScheme='whatsapp'
									variant='solid'
									isLoading={approve.isLoading && approve.id === dOfficer.id}
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
