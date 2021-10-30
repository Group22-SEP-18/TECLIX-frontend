import React, { useEffect } from 'react';
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	useDisclosure,
} from '@chakra-ui/react';
import { SettingsIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectLeaderboardPointSchema,
	getLeaderboardPointSchemaAsync,
} from '../../../redux/slices/leaderboardPointSchemaSlice';

const LeaderboardSchema = (props) => {
	const dispatch = useDispatch();
	const leaderboardPointSchema = useSelector(selectLeaderboardPointSchema);
	const { isOpen, onOpen, onClose } = useDisclosure();
	useEffect(() => {
		dispatch(getLeaderboardPointSchemaAsync());
	}, [dispatch]);
	return (
		<>
			<Button rightIcon={<SettingsIcon />} colorScheme='gray' onClick={onOpen}>
				Leaderboard Schema
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size='4xl'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Leaderboard Schema</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Table variant='unstyled'>
							<Thead>
								<Tr>
									<Th>Points Type</Th>
									<Th isNumeric>Percentage</Th>
									<Th isNumeric>Bonus Points</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								{leaderboardPointSchema.map((row, i) => (
									<Tr my='1' key={i}>
										<Td>{row.points_type}</Td>
										<Td isNumeric>{row.percentage} %</Td>
										<Td isNumeric>{row.bonus_points} points</Td>
										<Td>
											<Button
												rightIcon={<EditIcon />}
												colorScheme='gray'
												onClick={() => {}}
											>
												Edit Criteria
											</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
						<ModalFooter>
							<Button variant='ghost' rightIcon={<CheckIcon />}>
								Apply Changes
							</Button>
						</ModalFooter>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

LeaderboardSchema.propTypes = {};

export default LeaderboardSchema;
