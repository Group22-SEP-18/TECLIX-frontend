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
	const approveAccount = async () => {
		await dispatch(approveAccountById(dOfficer.id));
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
		await dispatch(rejectAccountById(dOfficer.id));
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
							fontSize={'xl'}
							fontFamily={'body'}
							textAlign='start'
							pl='4'
						>
							{dOfficer.first_name} {dOfficer.last_name}
							<Badge
								ml='4'
								px={4}
								py={1}
								colorScheme='green'
								fontWeight={'400'}
							>
								#Employee Id {dOfficer.employee_no}
							</Badge>
						</Heading>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Email: {dOfficer.email}
						</Text>
						<Text fontWeight={500} textAlign='start' pl='4'>
							Mobile: {dOfficer.contact_no}
						</Text>
					</Box>
					<Spacer />
					{!dOfficer.is_approved && (
						<Box>
							<VStack>
								<Spacer />
								<Button
									leftIcon={<CloseIcon />}
									colorScheme='red'
									variant='solid'
									isLoading={reject.isLoading && reject.id === dOfficer.id}
									onClick={rejectAccount}
								>
									Reject
								</Button>
								<Button
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
